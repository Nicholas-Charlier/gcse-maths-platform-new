import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Use service role key to bypass RLS for server-side updates
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.supabase_user_id;
    const subscriptionId = session.subscription as string;

    if (!userId) return NextResponse.json({ received: true });

    // Get the price ID from the subscription to determine tier
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const priceId = subscription.items.data[0].price.id;

    const tier =
      priceId === process.env.STRIPE_MONTHLY_PRICE_ID ? "monthly" : "yearly";

    await supabase
      .from("profiles")
      .update({
        subscription_tier: tier,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: subscriptionId,
      })
      .eq("id", userId);
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    await supabase
      .from("profiles")
      .update({ subscription_tier: "free" })
      .eq("stripe_customer_id", customerId);
  }

  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;
    const priceId = subscription.items.data[0].price.id;

    const tier =
      priceId === process.env.STRIPE_MONTHLY_PRICE_ID ? "monthly" : "yearly";

    await supabase
      .from("profiles")
      .update({ subscription_tier: tier })
      .eq("stripe_customer_id", customerId);
  }

  return NextResponse.json({ received: true });
}