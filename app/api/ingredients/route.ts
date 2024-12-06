import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

// полуаем ингридиенты
export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany();
    return NextResponse.json(ingredients);
  } catch (error) {
    console.log(`Error in ingredients GET: ${error}`);
  }
}
