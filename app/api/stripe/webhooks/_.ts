import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/shared/services/stripe";
import Stripe from "stripe";
import { sendEmail } from "@/shared/lib";

import { SuccessOrderTemplate } from "@/app/components/shared/email-templates";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const endpointSecret = process.env.NEXT_STRIPE_WEBHOOK_SECRET as string;
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    console.error("Missing Stripe signature in headers.");
    return new Response("Missing signature", { status: 400 });
  }

  let rawBody: Buffer;
  try {
    // Считываем поток тела запроса и преобразуем в Buffer
    const reader = req.body?.getReader();
    const chunks: Uint8Array[] = [];
    if (reader) {
      let done = false;
      while (!done) {
        const { value, done: isDone } = await reader.read();
        if (value) chunks.push(value);
        done = isDone;
      }
    }
    rawBody = Buffer.concat(chunks);

    // Попытка построить событие
    const event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    // console.log("Stripe event type:", event.type);

    // Обрабатываем разные типы событий
    switch (event.type) {
      case "charge.succeeded": {
        const charge = event.data.object as Stripe.Charge;
        console.log("Charge succeeded for Charge:", charge.id);
        console.log("Charge metadata:", charge.metadata);

        const paymentIntentId = charge.payment_intent as string;
        if (paymentIntentId) {
          // Запрашиваем PaymentIntent по ID
          const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId
          );

          // Извлекаем метаданные
          const { orderId, email, amount, description } =
            paymentIntent.metadata;
          console.log("Order ID:", orderId);
          console.log("Email:", email);
          console.log("Amount:", amount);
          console.log("Description:", description);

          const order = await prisma.order.findFirst({
            where: { id: Number(orderId) },
          });

          if (!order) {
            return NextResponse.json({ error: "Order not found" });
          }

          await prisma.order.update({
            where: {
              id: Number(orderId),
            },
            data: {
              paymentId: charge.id,
              status: OrderStatus.SUCCEEDED,
            },
          });

          const items =
            typeof order?.items === "string"
              ? (JSON.parse(order.items) as CartItemDTO[])
              : Array.isArray(order?.items)
              ? (order.items as unknown as CartItemDTO[])
              : [];

          // console.log("Final items:", items);

          await sendEmail(
            email,
            "Next Pizza / Payment for order #" + orderId,
            SuccessOrderTemplate({
              orderId: orderId,
              // solod098@gmail.com
              totalAmount: amount,
              items,
            })
          );
        }
        break;
      }

      default: {
        console.log(`Unhandled event type: ${event.type}`);
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error("Stripe Webhook Error:", (err as Error).message);
    return new Response(`Webhook Error: ${(err as Error).message}`, {
      status: 400,
    });
  }
}

// C:\ + strip.exe
//

// stripe login
// stripe listen --forward-to localhost:3000/api/webhooks/stripe
//

// stripe trigger invoice.payment_succeeded
// stripe trigger invoice.payment_failed

// https://theboroer.github.io/localtunnel-www/
// альтернатива через локал тунель сделать (19-26-00)
