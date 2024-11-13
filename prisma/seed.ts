// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
// оздание тестовых данных

import { PIZZAS, INGREDIENTS, PRODUCTS } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// генерируем данные
async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User Test",
        email: "user@prisma.io",
        password: hashSync("123456", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin Test",
        email: "admin@prisma.io",
        password: hashSync("123456", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({ data: PIZZAS });
  await prisma.ingredient.createMany({ data: INGREDIENTS });
  await prisma.product.createMany({ data: PRODUCTS });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Test Pizza 1",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Test Pizza 2",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Test Pizza 3",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(10, 15),
      },
    },
  });

  await prisma.productItem.createMany({ data: [] });
}

// очищаем данные
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

async function main() {
  await down();
  await up();
  try {
  } catch (error) {
    console.log(`Error in async function main:`, error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async error => {
    console.log(`Error in prisma seed:`, error);
    await prisma.$disconnect();
    process.exit(1);
  });
