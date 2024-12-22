"use server";

import { prisma } from "@/prisma/prisma-client";
import { TCheckoutFormValues } from "@/shared/constants";
import { sendEmail } from "@/shared/lib";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { PayOrderTemplate } from "./components";

export async function createOrder(data: TCheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    /* Находим корзину по токену */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    /* Если корзина не найдена возращаем ошибку */
    if (!userCart) {
      throw new Error("Cart not found");
    }

    /* Если корзина пустая возращаем ошибку */
    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    /* Создаем заказ */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    /* Очищаем корзину (НЕ УДАЛЯЕМ) */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    /* удаляем товары из корзины */
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // const paymentData = await createPayment({
    //   amount: order.totalAmount,
    //   orderId: order.id,
    //   description: "Payment for order #" + order.id,
    // });

    // if (!paymentData) {
    //   throw new Error("Payment data not found");
    // }

    // await prisma.order.update({
    //   where: {
    //     id: order.id,
    //   },
    //   data: {
    //     paymentId: paymentData.id,
    //   },
    // });

    // const paymentUrl = paymentData.confirmation.confirmation_url;

    await sendEmail(
      data.email,
      "Next Pizza / Payment for order #" + order.id,
      PayOrderTemplate({
        orderId: order.id,
        // solod098@gmail.com
        totalAmount: order.totalAmount,
        paymentUrl: "https://resend.com/docs/send-with-nextjs",
      })
    );

    // return paymentUrl;
  } catch (err) {
    console.log("[CreateOrder] Server error", err);
  }
}
