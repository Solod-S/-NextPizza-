// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
// оздание тестовых данных

import { Prisma } from "@prisma/client";
import { CATEGORIES, INGREDIENTS, PRODUCTS } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  let price = 10;
  switch (true) {
    case size === 20:
      price = randomNumber(10, 15);
      break;

    case size === 30:
      price = randomNumber(15, 20);
      break;

    case size === 40:
      price = randomNumber(20, 30);
      break;

    default:
      break;
  }

  return {
    productId,
    size,
    pizzaType,
    price,
    // carbs: randomNumber(10, 30),
    // fats: randomNumber(5, 15),
    // kcal: randomNumber(180, 300),
    // proteins: randomNumber(20, 45),
    // weight: randomNumber(400, 650),
  } as Prisma.ProductItemUncheckedCreateInput;
};

// создаем данные
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

  // генерируем категории
  await prisma.category.createMany({ data: CATEGORIES });

  // генерируем ингредиенты
  await prisma.ingredient.createMany({ data: INGREDIENTS });

  // генерируем продукты
  await prisma.product.createMany({ data: PRODUCTS });
  const pizza1 = await prisma.product.create({
    data: {
      name: "Cheese Joy",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(0, 5),
        // connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
  const pizza2 = await prisma.product.create({
    data: {
      name: "Pepperoni fresh",
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
      name: "Ham and cheese",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11EE7D60FDA22358AC33C6A44EB093A2.avif",
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(10, 15),
      },
    },
  });

  // генерируем разновидности продукта (цена, размер...)
  await prisma.productItem.createMany({
    data: [
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),
      {
        productId: pizza2.id,
        pizzaType: 1,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza2.id,
        pizzaType: 1,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza2.id,
        pizzaType: 1,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza2.id,
        pizzaType: 2,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza2.id,
        pizzaType: 2,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza2.id,
        pizzaType: 2,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza3.id,
        pizzaType: 1,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza3.id,
        pizzaType: 1,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza3.id,
        pizzaType: 1,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza3.id,
        pizzaType: 2,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza3.id,
        pizzaType: 2,
        size: 30,
        price: randomNumber(15, 20),
      },
      // {
      //   productId: pizza3.id,
      //   pizzaType: 2,
      //   size: 40,
      //   price: randomNumber(20, 30),
      // },

      // остальные продукты

      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
    ],
  });

  // генерируем корзины
  await prisma.cart.createMany({
    data: [
      { userId: 1, totalAmount: 0, token: "dghdf22hgggg3" },
      { userId: 2, totalAmount: 0, token: "dfshdf22hghg3" },
    ],
  });

  // генерируем айтемы корзин
  await prisma.cartItem.create({
    data: {
      cartId: 1,
      productItemId: 6,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      },
    },
  });
}

// очищаем данные
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`;
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
