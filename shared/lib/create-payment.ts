import { PayOrderTemplate } from "@/app/components";
import { stripe } from "../services/stripe";
// import { sendEmail } from "./sendEmail";
import { API_BASE_URL } from "../constants";

export interface createPaymentProps {
  email: string;
  amount: number;
  orderId: number;
  description: string;
}

export async function createPayment(values: createPaymentProps) {
  const { amount, orderId, description, email } = values;

  const orderDescription = `Order #${orderId}, order price ${amount.toFixed(
    2
  )}`;

  const lineItem = {
    price_data: {
      currency: "usd",
      product_data: {
        name: orderDescription,
      },
      unit_amount: amount * 100,
    },
    quantity: 1,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [lineItem],
    mode: "payment",
    success_url: `${API_BASE_URL}/success?orderId=${orderId}`,
    cancel_url: `${API_BASE_URL}/cancel?orderId=${orderId}`,
    payment_intent_data: {
      metadata: {
        orderId: orderId.toString(),
        email,
        amount: amount.toString(),
        description,
      },
    },
  });
  // console.log(`session`, session);

  // await sendEmail(
  //   email,
  //   "Next Pizza / Payment for order #" + orderId,
  //   PayOrderTemplate({
  //     orderId: orderId,
  //     // solod098@gmail.com
  //     totalAmount: amount,
  //     paymentUrl: session.url as string,
  //   })
  // );

  return session.id;
}
