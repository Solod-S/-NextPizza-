import { prisma } from "@/prisma/prisma-client";
import { calcCartTotalPrice } from "./calc-cart-item-total-price";

export const updateCartTotalAmount = async (token: string) => {
  try {
    // 1) находим корзину и берем все потраха
    const userCart = await prisma.cart.findFirst({
      where: { token },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    if (!userCart) {
      return null;
    }

    //  2) высчитываем сумму какждого товара с опциями в тотал
    const totalAmount = userCart?.items.reduce((acc, item) => {
      return acc + calcCartTotalPrice(item);
    }, 0);

    // 3) обновляем тотал сумму в базе
    const updatedCart = await prisma.cart.update({
      where: { id: userCart.id },
      data: { totalAmount },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });
    //  возвращаем корзину с обновленной инфой
    return updatedCart;
  } catch (error) {
    console.log(`Error in updateCartTotalAmount:`, error);
    return null;
  }
};
