import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";

// редактируем количество товаров в корзине
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Cart token not found" },
        { status: 403 }
      );
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id },
    });

    if (!cartItem) {
      return NextResponse.json(
        { message: "Cart item not found" },
        { status: 404 }
      );
    }

    await prisma.cartItem.update({
      where: { id },
      data: { quantity: data.quantity },
    });
    const updatedUserCart = await updateCartTotalAmount(token);
    //  считаем стоимость корзины и возвращаем ее

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log(`Error in cart CART PATCH: ${error}`);
    return NextResponse.json({ message: "Error in cart" }, { status: 500 });
  }
}

// удаляем товары из корзины
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Cart token not found" },
        { status: 403 }
      );
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id },
    });

    if (!cartItem) {
      return NextResponse.json(
        { message: "Cart item not found" },
        { status: 404 }
      );
    }

    await prisma.cartItem.delete({
      where: { id },
    });
    const updatedUserCart = await updateCartTotalAmount(token);
    //  считаем стоимость корзины и возвращаем ее
    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log(`Error in cart CART DELETE: ${error}`);
    return NextResponse.json({ message: "Error in cart" }, { status: 500 });
  }
}
