import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/app/lib/supabase/server";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) throw new Error("Missing STRIPE_SECRET_KEY");

const stripe = new Stripe(stripeSecretKey);

const PLAN_TO_PRICE: Record<string, string | undefined> = {
  monthly: process.env.STRIPE_MONTHLY_PRICE_ID,
  yearly: process.env.STRIPE_YEARLY_PRICE_ID,
};

export async function POST(request: NextRequest) {
  let plan: string;

  try {
    const body = await request.json();
    plan = body.plan;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!plan || !PLAN_TO_PRICE[plan]) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const priceId = PLAN_TO_PRICE[plan];

  if (!priceId) {
    console.error(`Missing price ID for plan: ${plan}`);
    return NextResponse.json({ error: "Plan not configured" }, { status: 500 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/upgrade`,
      customer_email: user.email,
      metadata: {
        supabase_user_id: user.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}