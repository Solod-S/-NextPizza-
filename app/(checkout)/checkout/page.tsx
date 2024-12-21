"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutSidebar,
  Container,
  Title,
} from "@/app/components";
import { checkoutFormSchema, TCheckoutFormValues } from "@/shared/constants";
import { useCart } from "@/shared/hooks";

export default function Checkout() {
  const { totalAmount, items, updateItemQuantity, removeCartItem, loading } =
    useCart();

  const form = useForm<TCheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const onSubmit = (data: TCheckoutFormValues) => {
    console.log(`data`, data);
  };

  return (
    <Container>
      <Title
        text="Placing an order"
        className="font-extrabold mb-10 text-[36px]"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Левая часть*/}

            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                loading={loading}
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
              />
              <CheckoutPersonalForm className="opacity-40 pointer-events-none" />
              <CheckoutAddressForm />
            </div>
            {/* Правая часть*/}
            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
