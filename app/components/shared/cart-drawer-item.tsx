import { cn } from "@/shared/lib/utils";
import React from "react";

import * as CartItem from "./cart-item-details";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
  loading: boolean;

  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  loading,
  imageUrl,
  name,
  price,
  quantity,
  details,
  disabled,
  onClickCountButton,
  onClickRemove,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex bg-white p-5 gap-6",
        {
          "opacity-50 pointer-events-none": disabled,
        },
        className
      )}
    >
      <CartItem.Image src={imageUrl} />

      <div className="flex-1">
        <CartItem.Info name={name} details={details} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButton
            onClick={onClickCountButton}
            value={quantity}
            loading={loading}
          />

          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <button onClick={onClickRemove} disabled={loading}>
              <Trash2Icon
                // className="text-gray-400 cursor-pointer hover:text-gray-600"
                className={cn(
                  "cursor-pointer",
                  loading
                    ? "text-gray-100"
                    : "text-gray-400 hover:text-gray-600"
                )}
                size={16}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
