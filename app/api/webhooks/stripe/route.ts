import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/app/lib/supabase/server";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

if (!stripeSecretKey) throw new Error("Missing STRIPE_SECRET_KEY");
if (!webhookSecret) throw new Error("Missing STRIPE_WEBHOOK_SECRET");

const stripe = new Stripe(stripeSecretKey);

export async function POST(request: NextRequest) {
  const supabase = createAdminClient();

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.supabase_user_id;
    const subscriptionId = session.subscription as string;

    if (!userId) {
      console.error("checkout.session.completed: missing supabase_user_id in metadata");
      return NextResponse.json({ received: true });
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const priceId = subscription.items.data[0].price.id;
    const tier = resolveTier(priceId);

    if (!tier) {
      console.error("checkout.session.completed: unrecognised price ID:", priceId);
      return NextResponse.json({ error: "Unknown price ID" }, { status: 400 });
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        subscription_tier: tier,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: subscriptionId,
      })
      .eq("id", userId);

    if (error) {
      console.error("checkout.session.completed: failed to update profile:", error);
      return NextResponse.json({ error: "Database update failed" }, { status: 500 });
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    const { error } = await supabase
      .from("profiles")
      .update({ subscription_tier: "free" })
      .eq("stripe_customer_id", customerId);

    if (error) {
      console.error("customer.subscription.deleted: failed to update profile:", error);
      return NextResponse.json({ error: "Database update failed" }, { status: 500 });
    }
  }

  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object as Stripe.Subscription;

    if (subscription.status !== "active") {
      return NextResponse.json({ received: true });
    }

    const customerId = subscription.customer as string;
    const priceId = subscription.items.data[0].price.id;
    const tier = resolveTier(priceId);

    if (!tier) {
      console.error("customer.subscription.updated: unrecognised price ID:", priceId);
      return NextResponse.json({ error: "Unknown price ID" }, { status: 400 });
    }

    const { error } = await supabase
      .from("profiles")
      .update({ subscription_tier: tier })
      .eq("stripe_customer_id", customerId);

    if (error) {
      console.error("customer.subscription.updated: failed to update profile:", error);
      return NextResponse.json({ error: "Database update failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

function resolveTier(priceId: string): "monthly" | "yearly" | null {
  if (priceId === process.env.STRIPE_MONTHLY_PRICE_ID) return "monthly";
  if (priceId === process.env.STRIPE_YEARLY_PRICE_ID) return "yearly";
  return null;
}