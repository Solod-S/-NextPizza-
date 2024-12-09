export const dynamic = "force-dynamic";

import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/prisma/prisma-client";

// поиск товаров
export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("query") || "";

    const products = await prisma.product.findMany({
      where: { name: { contains: query, mode: "insensitive" } },
      take: 5,
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log(`Error in product search GET: ${error}`);
    return NextResponse.json(
      { error: "An error occurred while fetching products." },
      { status: 500 }
    );
  }
}
