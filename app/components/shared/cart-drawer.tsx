"use client";

import React, { useEffect } from "react";
// import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import {
  Sheet,
  // SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";
import { useCartStore } from "@/shared/store";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";

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
    fetchCartItems,
    updateItemQuantity,
    removeCartItem,
  } = useCartStore(state => state);
  // const [fetchCartItems] = useCartStore(state => [state.fetchCartItems]);
  useEffect(() => {
    fetchCartItems();
  }, []);

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
          <SheetHeader>
            <SheetTitle>
              Cart <span className="font-bolt">{items.length} items</span>
            </SheetTitle>
          </SheetHeader>

          {/* Items */}
          <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
            {items.length > 0 &&
              items.map(item => (
                <div key={item.id} className="mt-2">
                  <CartDrawerItem
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
                  // loading={redirecting}
                  type="submit"
                  className="w-full h-12 text-base"
                >
                  Place an order
                  <ArrowRight className="w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
