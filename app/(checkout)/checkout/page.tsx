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
import { createOrder } from "@/app/action";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";
import { User } from "@prisma/client";

export default function Checkout() {
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
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

  useEffect(() => {
    async function fetchUserInfo() {
      console.log(1);
      const data = (await Api.auth.getMe()) as User;
      console.log(`data`, data);

      const [firstName, lastName] = data.fullName.split(" ");
      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }

    if (session) {
      console.log(`session`, session);
      fetchUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const onSubmit = async (data: TCheckoutFormValues) => {
    try {
      setSubmitting(true);

      toast.error("Order successfully placed! 📝 Proceeding to payment... ", {
        icon: "✅",
      });

      const paymentSessionId = await createOrder(data);

      if (!paymentSessionId) {
        throw new Error("Failed to create payment session");
      }

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
      );

      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      await stripe.redirectToCheckout({ sessionId: paymentSessionId });
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error("Failed to create order", {
        icon: "❌",
      });
    }
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
              <CheckoutPersonalForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />

              <CheckoutAddressForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
            </div>
            {/* Правая часть*/}
            <div className="w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
