import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateCart } from "@/shared/lib";
import { CreateCartItemsValuesDTO } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
// получаем корзину
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

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

    // найди пользователя у которого есть такой userId или такой token
    // дай все товары (items)
    //  отсортируй по созданию
    //  вместе с айтемом верни его productItems и сам продукт и ингридиеты
    return NextResponse.json(userCart);
  } catch (error) {
    console.log(`Error in cart GET: ${error}`);
    return NextResponse.json(
      { message: "Failed to get cart" },
      { status: 500 }
    );
  }
}

// создаем корзину или увеличиваем на +1 товар в найденой корзине
export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;
    const data = (await req.json()) as CreateCartItemsValuesDTO;
    console.log(`req.cookies.get`, token);
    // если токена нет тогда генерируем его
    if (!token) {
      token = crypto.randomUUID();
    }
    //  создаем или находим корзину
    const userCart = await findOrCreateCart(token);
    //  проверяем не был ли добавлен ранее товар, если был + такие же ингридиенты, делаем + 1

    // const findCartItem = await prisma.cartItem.findFirst({
    //   where: {
    //     cartId: userCart.id,
    //     productItemId: data.productItemId,
    //     ...{data.ingredients ? {ingredients: {
    //       some: {
    //         id: { in: data.ingredients }
    //       }
    //     }} : {}}
    //   },
    //   include: {
    //     ingredients: true,
    //   },
    // });

    // const findCartItem = await prisma.cartItem.findFirst({
    //   where: {
    //     cartId: userCart.id,
    //     productItemId: data.productItemId,
    //     ingredients: {
    //       every: {
    //         id: { in: data.ingredients },
    //       },
    //       some: {},
    //       // костыль потому что проблемы с добавлением пиц с разными ингридиентами
    //       //  15:21
    //     },
    //   },
    // });
    const cartItems = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
      },
      include: {
        ingredients: true,
      },
    });

    let findCartItem = null;

    if (data.ingredients && Array.isArray(data.ingredients)) {
      // Сортируем массив ингредиентов для сравнения
      const sortedDataIngredients = data.ingredients.sort((a, b) => a - b);

      // Ищем подходящий товар
      findCartItem = cartItems.find(item => {
        const itemIngredients = item.ingredients
          .map(ingredient => ingredient.id)
          .sort((a, b) => a - b);
        return (
          JSON.stringify(itemIngredients) ===
          JSON.stringify(sortedDataIngredients)
        );
      });
    } else {
      // Если `data.ingredients` отсутствует, ищем товар без ингредиентов
      findCartItem = cartItems.find(item => item.ingredients.length === 0);
    }

    //
    //  сценарий если товар был найден - делаем +1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: { id: findCartItem.id },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: {
            connect: data.ingredients?.map(id => ({ id })),
          },
        },
      });
    }
    const updatedUserCart = await updateCartTotalAmount(token);
    //  считаем стоимость корзины и возвращаем ее

    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set(`cartToken`, token);
    // добавляем токен к ответу
    return resp;
  } catch (error) {
    console.log(`Error in cart POST: ${error}`);
    return NextResponse.json(
      { message: "Failed to create cart" },
      { status: 500 }
    );
  }
}
