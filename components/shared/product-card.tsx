import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
  imageUrl?: string;
}

export const ProductCard: React.FC<Props> = ({ className, imageUrl }) => {
  return (
    <div className={className}>
      <Link href="/product/1/">
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt="logo" />
        </div>
      </Link>
    </div>
  );
};
