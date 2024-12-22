import React from "react";
import { WhiteBlock } from "../white-bock";
import { CheckoutItem } from "../checkout-item";
import { getCartItemDetails } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";

interface Props {
  loading: boolean;
  items: CartStateItem[];
  className?: string;
  onClickCountButton: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
  removeCartItem: (id: number) => void;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  loading,
  className,
  onClickCountButton,
  removeCartItem,
}) => {
  return (
    <WhiteBlock title="1. Cart" className={className}>
      <div className="flex flex-col gap-5">
        {loading &&
          Array.from({ length: 4 }, (_, index) => (
            <CheckoutItemSkeleton key={index} />
          ))}

        {!loading &&
          items.length > 0 &&
          items.map(item => (
            <CheckoutItem
              loading={loading}
              disabled={item.disabled}
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              details={getCartItemDetails(
                item.ingredients,
                item.pizzaType as PizzaType,
                item.pizzaSize as PizzaSize
              )}
              name={item.name}
              price={Number(item.price.toFixed(2))}
              quantity={item.quantity}
              onClickCountButton={type =>
                onClickCountButton(item.id, item.quantity, type)
              }
              onClickRemove={() => removeCartItem(item.id)}
            />
          ))}
      </div>
    </WhiteBlock>
  );
};
