import {
  ChoosePizzaForm,
  ChooseProductForm,
  Container,
  GroupVariants,
  PizzaImage,
  Title,
} from "@/app/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { useCartStore } from "@/shared/store";
import { notFound } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
    },
  });
  const { addCartItem, loading } = useCartStore(state => state);

  if (!product) {
    return notFound();
  }
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      if (isPizzaForm) {
        await addCartItem({ productItemId, ingredients });
      } else {
        await addCartItem({ productItemId: firstItem.id });
        // так как нету вариаций стоимость одна и все просто
      }
      toast.success(`${product.name} added to cart successfully`);
    } catch (error) {
      toast.error(`Failed to add product to cart`);
      console.error(`Error adding product:`, error);
    }
  };
  return (
    <Container className="flex flex-col my-10">
      {/* <div className="flex flex-1">
        <PizzaImage imageUrl={product.imageUrl} size={40} />

        <div className="w-[490px] bg-[#fcfcfc] p-7">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />
          <p className="text-gray-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis,
            rem ea ratione earum aut iure odio delectus explicabo minima
            eligendi soluta distinctio sit unde, libero iusto. Ut, pariatur
            corporis? Possimus?
          </p>
          <GroupVariants
            value="2"
            items={[
              { name: "Small", value: "1" },
              { name: "Medium", value: "2" },
              { name: "Big", value: "3", disabled: true },
            ]}
          />
        </div>
      </div> */}
      {isPizzaForm ? (
        <ChoosePizzaForm
          imageUrl={product.imageUrl}
          name={product.name}
          ingredients={product.ingredients}
          items={product.items}
          onSubmit={onSubmit}
          loading={loading}
        />
      ) : (
        <ChooseProductForm
          imageUrl={product.imageUrl}
          name={product.name}
          onSubmit={onSubmit}
          price={firstItem.price}
          loading={loading}
        />
      )}
    </Container>
  );
}
