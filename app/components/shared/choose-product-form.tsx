import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  loading: boolean;
  className?: string;
  onSubmit: VoidFunction;
}

export const ChooseProductForm: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  loading,
  className,
  onSubmit,
}) => {
  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[400px] h-[400px]"
        />
      </div>
      <div className="w-[490] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        {/* <p className="text-gray-400"> {textDetails} </p> */}

        <Button
          loading={loading}
          onClick={() => onSubmit()}
          className={cn("h-[55px]px-10 text-base rounded-[18px] w-full mt-10", {
            "w-full": loading,
          })}
        >
          Add to cart for {price} $
        </Button>
      </div>
    </div>
  );
};
