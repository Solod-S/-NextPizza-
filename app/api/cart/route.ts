import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ items: [] });
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
    return NextResponse.json({ userCart });
  } catch (error) {
    console.log(`Error in cart GET: ${error}`);
  }
}
