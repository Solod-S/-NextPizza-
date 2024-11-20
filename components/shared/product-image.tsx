import { cn } from "@/lib/utils";
import React from "react";

interface ProductImageProps {
  className?: string;
  imageUrl: string;
  size: number;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  className,
  imageUrl,
  size,
}) => {
  const dynamicSize =
    size === 20
      ? "w-[300px] h-[300px]"
      : size === 30
      ? "w-[400px] h-[400px]"
      : size === 40
      ? "w-[500px] h-[500px]"
      : "";

  return (
    <div
      className={cn(
        "flex item-center justify-center flex-1 relative w-full",
        className
      )}
    >
      <img
        src={imageUrl}
        alt="logo"
        className={cn(
          "relative left-2 top-2 transition-all z-10 duration-300",
          dynamicSize // Подключаем динамический размер
        )}
        // className={cn(
        //   "relative left-2 top-2 transition-all z-10 duration-300",
        //   {
        //     "w-{300px} h-{300px}": size == 20,
        //     "w-{400px} h-{400px}": size == 30,
        //     "w-{500px} h-{500px}": size == 40,
        //   }
        // )}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-100 w-[370px] h-[370px]"></div>
    </div>
  );
};
