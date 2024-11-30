"use client";

import React from "react";
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

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
          <SheetHeader>
            <SheetTitle>
              Cart <span className="font-bolt">3 items</span>
            </SheetTitle>
          </SheetHeader>

          {/* Items */}
          <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
            <div className="mt-2">
              <CartDrawerItem
                id={0}
                imageUrl={
                  "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif"
                }
                details={getCartItemDetails(2, 30, [
                  { name: "Cheese" },
                  { name: "Bacon" },
                ])}
                name={"Cheese Joy"}
                price={24}
                quantity={3}
              />
            </div>
            <div className="mt-2">
              <CartDrawerItem
                id={0}
                imageUrl={
                  "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif"
                }
                details={getCartItemDetails(2, 30, [
                  { name: "Cheese" },
                  { name: "Bacon" },
                ])}
                name={"Cheese Joy"}
                price={24}
                quantity={3}
              />
            </div>
            <div className="mt-2">
              <CartDrawerItem
                id={0}
                imageUrl={
                  "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif"
                }
                details={getCartItemDetails(2, 30, [
                  { name: "Cheese" },
                  { name: "Bacon" },
                ])}
                name={"Cheese Joy"}
                price={24}
                quantity={3}
              />
            </div>
            <div className="mt-2">
              <CartDrawerItem
                id={0}
                imageUrl={
                  "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif"
                }
                details={getCartItemDetails(2, 30, [
                  { name: "Cheese" },
                  { name: "Bacon" },
                ])}
                name={"Cheese Joy"}
                price={24}
                quantity={3}
              />
            </div>
            <div className="mt-2">
              <CartDrawerItem
                id={0}
                imageUrl={
                  "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif"
                }
                details={getCartItemDetails(2, 30, [
                  { name: "Cheese" },
                  { name: "Bacon" },
                ])}
                name={"Cheese Joy"}
                price={24}
                quantity={3}
              />
            </div>
            <div className="mt-2">
              <CartDrawerItem
                id={0}
                imageUrl={
                  "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif"
                }
                details={getCartItemDetails(2, 30, [
                  { name: "Cheese" },
                  { name: "Bacon" },
                ])}
                name={"Cheese Joy"}
                price={24}
                quantity={3}
              />
            </div>
            <div className="mt-2">
              <CartDrawerItem
                id={0}
                imageUrl={
                  "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif"
                }
                details={getCartItemDetails(2, 30, [
                  { name: "Cheese" },
                  { name: "Bacon" },
                ])}
                name={"Cheese Joy"}
                price={24}
                quantity={3}
              />
            </div>
            <div className="mt-2">
              <CartDrawerItem
                id={0}
                imageUrl={
                  "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif"
                }
                details={getCartItemDetails(2, 30, [
                  { name: "Cheese" },
                  { name: "Bacon" },
                ])}
                name={"Cheese Joy"}
                price={24}
                quantity={3}
              />
            </div>
            <div className="mt-2">
              <CartDrawerItem
                id={0}
                imageUrl={
                  "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif"
                }
                details={getCartItemDetails(2, 30, [
                  { name: "Cheese" },
                  { name: "Bacon" },
                ])}
                name={"Cheese Joy"}
                price={24}
                quantity={3}
              />
            </div>
          </div>

          <SheetFooter className="-mx-6 bg-white p-8">
            <div className="w-full">
              <div className="flex mb-4">
                <span className="flex flex-1 text-lg text-neutral-500">
                  Total
                  <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                </span>

                <span className="font-bold text-lg">20 $</span>
              </div>

              <Link href="/checkout">
                <Button
                  // onClick={() => setRedirecting(true)}
                  // loading={redirecting}
                  type="submit"
                  className="w-full h-12 text-base"
                >
                  Оформить заказ
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
