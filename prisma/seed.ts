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
  let price = randomNumber(3, 7);
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
  // генерируем пользователей
  // await prisma.user.createMany({
  //   data: [
  //     {
  //       fullName: "User Test",
  //       email: "user@prisma.io",
  //       password: hashSync("123456", 10),
  //       verified: new Date(),
  //       role: "USER",
  //     },
  //     {
  //       fullName: "Admin Test",
  //       email: "admin@prisma.io",
  //       password: hashSync("123456", 10),
  //       verified: new Date(),
  //       role: "ADMIN",
  //     },
  //   ],
  // });

  // генерируем категории
  await prisma.category.createMany({ data: CATEGORIES });

  // генерируем ингредиенты
  await prisma.ingredient.createMany({ data: INGREDIENTS });

  // генерируем продукты
  await prisma.product.createMany({ data: PRODUCTS });
  const pizza1 = await prisma.product.create({
    data: {
      name: "Cheese Joy",
      imageUrl: "/pizzas/cheese-joy.avif",
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
      imageUrl: "/pizzas/pepperoni-fresh.avif",
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Ham and cheese",
      imageUrl: "/pizzas/ham-and-cheese.avif",
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(10, 15),
      },
    },
  });

  const pizza4 = await prisma.product.create({
    data: {
      name: "Double Chicken",
      imageUrl: "/pizzas/double-ch.avif",
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(10, 15),
      },
    },
  });

  const pizza5 = await prisma.product.create({
    data: {
      name: "Chorizo ​​fresh",
      imageUrl: "/pizzas/chorizo​-fresh.avif",
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(10, 15),
      },
    },
  });

  const pizza6 = await prisma.product.create({
    data: {
      name: "Ham and mushrooms",
      imageUrl: "/pizzas/ham-and-mushrooms.avif",
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(10, 15),
      },
    },
  });

  const pizza7 = await prisma.product.create({
    data: {
      name: "Julien",
      imageUrl: "/pizzas/julien.avif",
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(10, 15),
      },
    },
  });

  const pizza8 = await prisma.product.create({
    data: {
      name: "Meat",
      imageUrl: "/pizzas/meat.avif",
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(10, 15),
      },
    },
  });

  const pizza9 = await prisma.product.create({
    data: {
      name: "Burger Pizza",
      imageUrl: "/pizzas/burger-pizza.avif",
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(10, 15),
      },
    },
  });

  const pizza10 = await prisma.product.create({
    data: {
      name: "Four seasons",
      imageUrl: "/pizzas/four-seasons.avif",
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(10, 15),
      },
    },
  });

  const pizza11 = await prisma.product.create({
    data: {
      name: "Hawaiian",
      imageUrl: "/pizzas/hawaiian.avif",
      categoryId: 1,
      ingredients: {
        connect: INGREDIENTS.slice(10, 15),
      },
    },
  });

  const pizza12 = await prisma.product.create({
    data: {
      name: "Diablo",
      imageUrl: "/pizzas/diablo.avif",
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
      {
        productId: pizza3.id,
        pizzaType: 2,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza4.id,
        pizzaType: 1,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza4.id,
        pizzaType: 1,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza4.id,
        pizzaType: 1,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza4.id,
        pizzaType: 2,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza4.id,
        pizzaType: 2,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza4.id,
        pizzaType: 2,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza5.id,
        pizzaType: 1,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza5.id,
        pizzaType: 1,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza5.id,
        pizzaType: 1,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza5.id,
        pizzaType: 2,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza5.id,
        pizzaType: 2,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza5.id,
        pizzaType: 2,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza6.id,
        pizzaType: 1,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza6.id,
        pizzaType: 1,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza6.id,
        pizzaType: 1,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza6.id,
        pizzaType: 2,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza6.id,
        pizzaType: 2,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza6.id,
        pizzaType: 2,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza7.id,
        pizzaType: 1,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza7.id,
        pizzaType: 1,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza7.id,
        pizzaType: 1,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza7.id,
        pizzaType: 2,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza7.id,
        pizzaType: 2,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza7.id,
        pizzaType: 2,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza8.id,
        pizzaType: 1,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza8.id,
        pizzaType: 1,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza8.id,
        pizzaType: 1,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza8.id,
        pizzaType: 2,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza8.id,
        pizzaType: 2,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza8.id,
        pizzaType: 2,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza9.id,
        pizzaType: 1,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza9.id,
        pizzaType: 1,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza9.id,
        pizzaType: 1,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza9.id,
        pizzaType: 2,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza9.id,
        pizzaType: 2,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza9.id,
        pizzaType: 2,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza10.id,
        pizzaType: 1,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza10.id,
        pizzaType: 1,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza10.id,
        pizzaType: 1,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza10.id,
        pizzaType: 2,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza10.id,
        pizzaType: 2,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza10.id,
        pizzaType: 2,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza11.id,
        pizzaType: 1,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza11.id,
        pizzaType: 1,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza11.id,
        pizzaType: 1,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza11.id,
        pizzaType: 2,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza11.id,
        pizzaType: 2,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza11.id,
        pizzaType: 2,
        size: 40,
        price: randomNumber(20, 30),
      },
      {
        productId: pizza12.id,
        pizzaType: 1,
        size: 20,
        price: randomNumber(10, 15),
      },
      {
        productId: pizza12.id,
        pizzaType: 1,
        size: 30,
        price: randomNumber(15, 20),
      },
      {
        productId: pizza12.id,
        pizzaType: 1,
        size: 40,
        price: randomNumber(20, 30),
      },

      // остальные продукты
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
      generateProductItem({ productId: 18 }),
      generateProductItem({ productId: 19 }),
      generateProductItem({ productId: 20 }),
      generateProductItem({ productId: 21 }),
      generateProductItem({ productId: 22 }),
    ],
  });

  // генерируем корзины
  // await prisma.cart.createMany({
  //   data: [
  //     { userId: 1, totalAmount: 0, token: "dghdf22hgggg3" },
  //     { userId: 2, totalAmount: 0, token: "dfshdf22hghg3" },
  //   ],
  // });

  // генерируем айтемы корзин
  // await prisma.cartItem.create({
  //   data: {
  //     cartId: 1,
  //     productItemId: 6,
  //     quantity: 2,
  //     ingredients: {
  //       connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
  //     },
  //   },
  // });

  // генерируем сториз
  await prisma.story.createMany({
    data: [
      {
        previewImageUrl: "/stories/story/story-1.webp",
      },
      {
        previewImageUrl: "/stories/story/story-2.webp",
      },
      {
        previewImageUrl: "/stories/story/story-3.webp",
      },
      {
        previewImageUrl: "/stories/story/story-4.webp",
      },
      {
        previewImageUrl: "/stories/story/story-5.webp",
      },
      {
        previewImageUrl: "/stories/story/story-6.webp",
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl: "/stories/story-item/story-item-1-1.webp",
      },
      {
        storyId: 1,
        sourceUrl: "/stories/story-item/story-item-1-2.webp",
      },
      {
        storyId: 1,
        sourceUrl: "/stories/story-item/story-item-1-3.webp",
      },
      {
        storyId: 1,
        sourceUrl: "/stories/story-item/story-item-1-4.webp",
      },
      {
        storyId: 1,
        sourceUrl: "/stories/story-item/story-item-1-5.webp",
      },
      {
        storyId: 2,
        sourceUrl: "/stories/story-item/story-item-2-1.webp",
      },
      {
        storyId: 2,
        sourceUrl: "/stories/story-item/story-item-2-2.webp",
      },
      {
        storyId: 2,
        sourceUrl: "/stories/story-item/story-item-2-3.webp",
      },
      {
        storyId: 3,
        sourceUrl: "/stories/story-item/story-item-3-1.webp",
      },
      {
        storyId: 3,
        sourceUrl: "/stories/story-item/story-item-3-2.webp",
      },
      {
        storyId: 3,
        sourceUrl: "/stories/story-item/story-item-3-3.webp",
      },
      {
        storyId: 3,
        sourceUrl: "/stories/story-item/story-item-3-4.webp",
      },
      {
        storyId: 3,
        sourceUrl: "/stories/story-item/story-item-3-5.webp",
      },
      {
        storyId: 4,
        sourceUrl: "/stories/story-item/story-item-4-1.webp",
      },
      {
        storyId: 4,
        sourceUrl: "/stories/story-item/story-item-4-2.webp",
      },
      {
        storyId: 4,
        sourceUrl: "/stories/story-item/story-item-4-3.webp",
      },
      {
        storyId: 4,
        sourceUrl: "/stories/story-item/story-item-4-4.webp",
      },
      {
        storyId: 5,
        sourceUrl: "/stories/story-item/story-item-5-1.webp",
      },
      {
        storyId: 5,
        sourceUrl: "/stories/story-item/story-item-5-2.webp",
      },
      {
        storyId: 5,
        sourceUrl: "/stories/story-item/story-item-5-3.webp",
      },
      {
        storyId: 6,
        sourceUrl: "/stories/story-item/story-item-6-1.webp",
      },
      {
        storyId: 6,
        sourceUrl: "/stories/story-item/story-item-6-2.webp",
      },
      {
        storyId: 6,
        sourceUrl: "/stories/story-item/story-item-6-3.webp",
      },
      {
        storyId: 6,
        sourceUrl: "/stories/story-item/story-item-6-4.webp",
      },
      {
        storyId: 6,
        sourceUrl: "/stories/story-item/story-item-6-5.webp",
      },
    ],
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
  await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE;`;
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
