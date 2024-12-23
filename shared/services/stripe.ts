import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.NEXT_STRIPE_SECRET_API_KEY || "api_key_placeholder"
);
