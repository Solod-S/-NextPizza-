import React from "react";
import { WhiteBlock } from "./white-bock";
import { CheckoutItemDetails } from "./checkout-item-details";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "../ui";

interface Props {
  totalAmount: number;
  loading?: boolean;
}

const VAT = 15;
const DELIVERY_PRICE = 5;

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading }) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;
  return (
    <WhiteBlock className="p-6 sticky top-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Total</span>
        <span className="h-11 text-[34px] font-extrabold">
          {loading ? (
            <Skeleton className=" h-11 w-48  rounded-[7px]" />
          ) : (
            totalPrice.toFixed(2) + " $"
          )}
        </span>
      </div>
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-300" />
            Product cost
          </div>
        }
        value={
          loading ? (
            <Skeleton className=" h-6 w-14 rounded-[7px]" />
          ) : (
            `${totalAmount.toFixed(2)}` + " $"
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-300" />
            Taxes
          </div>
        }
        value={
          loading ? (
            <Skeleton className=" h-6 w-14 rounded-[7px]" />
          ) : (
            `${vatPrice.toFixed(2)}` + " $"
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-300" />
            Delivery
          </div>
        }
        value={
          loading ? (
            <Skeleton className=" h-6 w-14 rounded-[7px]" />
          ) : (
            `${DELIVERY_PRICE}` + " $"
          )
        }
      />
      <Button
        type="submit"
        // disabled={totalAmount || submitting}
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Proceed to payment
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
