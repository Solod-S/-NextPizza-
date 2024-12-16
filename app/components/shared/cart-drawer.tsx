"use client";

import React from "react";
// import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { CartDrawerItem } from "./cart-drawer-item";
import { cn, getCartItemDetails } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import Image from "next/image";
import { Title } from "./title";
import { useCart } from "@/shared/hooks";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  const {
    totalAmount,
    items,

    updateItemQuantity,
    removeCartItem,
    loading,
  } = useCart();

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };
  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
          <div
            className={cn(
              "flex flex-col h-full",
              !totalAmount && "justify-center"
            )}
          >
            {totalAmount > 0 && (
              <SheetHeader>
                <SheetTitle>
                  Cart <span className="font-bolt">{items.length} items</span>
                </SheetTitle>
              </SheetHeader>
            )}
            {!totalAmount && (
              <div className="flex flex-col items-center justify-center w-72 mx-auto">
                <Image
                  src="/assets/images/empty-box.png"
                  alt="empty cart"
                  width={120}
                  height={120}
                />
                <Title
                  size="sm"
                  text="Empty cart"
                  className="text-center font-bolt my-2"
                ></Title>
                <p className="text-center text-neutral-500 mb-5">
                  Add at least one pizza to complete your order{" "}
                </p>
                <SheetClose>
                  <Button className="w-56 h-12 text-base" size="lg">
                    <ArrowLeft className="w-5 mr-2" />
                    Go back
                  </Button>
                </SheetClose>
              </div>
            )}

            {/* Items */}
            {totalAmount > 0 && (
              <>
                <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
                  {items.length > 0 &&
                    items.map(item => (
                      <div key={item.id} className="mt-2">
                        <CartDrawerItem
                          loading={loading}
                          disabled={item.disabled}
                          id={item.id}
                          imageUrl={item.imageUrl}
                          details={
                            item.pizzaSize || item.pizzaType
                              ? getCartItemDetails(
                                  item.ingredients,
                                  item.pizzaType as PizzaType,
                                  item.pizzaSize as PizzaSize
                                )
                              : ""
                          }
                          name={item.name}
                          price={Number(item.price.toFixed(2))}
                          quantity={item.quantity}
                          onClickCountButton={type =>
                            onClickCountButton(item.id, item.quantity, type)
                          }
                          onClickRemove={() => removeCartItem(item.id)}
                        />
                      </div>
                    ))}
                </div>

                <SheetFooter className="-mx-6 bg-white p-8">
                  <div className="w-full">
                    <div className="flex mb-4">
                      <span className="flex flex-1 text-lg text-neutral-500">
                        Total
                        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                      </span>

                      <span className="font-bold text-lg">
                        {totalAmount.toFixed(2)} $
                      </span>
                    </div>

                    <Link href="/checkout">
                      <Button
                        // onClick={() => setRedirecting(true)}
                        loading={loading}
                        type="submit"
                        className="w-full h-12 text-base"
                      >
                        Place an order
                        <ArrowRight className="w-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </SheetFooter>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
