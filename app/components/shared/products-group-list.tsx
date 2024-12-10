"use client";

import React from "react";
import { useIntersection } from "react-use";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";
import { ProductCard } from "./product-card";
import { useCategoryStore } from "@/shared/store/category";

interface Props {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  categoryId,
  className,
  listClassName,
}) => {
  const setActiveCategoryId = useCategoryStore(state => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, { threshold: 0.7 });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      // если список в поле зрения
      console.log(title + " is in view");
      console.log(categoryId + " is categoryId");
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, setActiveCategoryId, title]);
  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extralight mb-5" />
      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map(({ id, name, imageUrl, items, ingredients }) => (
          <ProductCard
            key={id}
            id={id}
            name={name}
            imageUrl={imageUrl}
            price={items[0].price}
            ingredients={ingredients}
          />
        ))}
      </div>
    </div>
  );
};
