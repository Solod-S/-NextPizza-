"use server";
import { prisma } from "@/prisma/prisma-client";
import { TCheckoutFormValues } from "@/shared/constants";
import { createPayment } from "@/shared/lib";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

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

    // создаем сессию для страйпа
    const paymentSessionId = await createPayment({
      email: data.email,
      amount: order.totalAmount,
      orderId: order.id,
      description: "Payment for order #" + order.id,
    });

    // console.log(`paymentSessionId`, paymentSessionId);

    if (!paymentSessionId) {
      throw new Error("Payment data not found");
    }

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

    /* обновляем статус заказа - айди платежа */
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentSessionId,
      },
    });

    return paymentSessionId;
  } catch (err) {
    console.log("[CreateOrder] Server error", err);
  }
}
