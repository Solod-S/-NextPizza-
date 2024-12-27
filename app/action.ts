"use server";
import { prisma } from "@/prisma/prisma-client";
import { TCheckoutFormValues } from "@/shared/constants";
import {
  createPayment,
  // sendEmail
} from "@/shared/lib";
import { getUserSession } from "@/shared/lib/get-user-session";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";
// import { VerificationUserTemplate } from "./components/shared/email-templates";

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

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("User not found");
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    });
  } catch (err) {
    console.log("Error [UPDATE_USER]", err);
    throw err;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Email not confirmed");
      }

      throw new Error("The user already exists");
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
        verified: body.verified,
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.varificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    // await sendEmail(
    //   createdUser.email,
    //   "Next Pizza / 📝 Confirmation of registration",
    //   VerificationUserTemplate({
    //     code,
    //   })
    // );
    return createdUser;
  } catch (err) {
    console.log("Error [CREATE_USER]", err);
    throw err;
  }
}
