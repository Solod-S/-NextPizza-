"use client";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import { Category } from "@prisma/client";
import React from "react";

interface Props {
  items: Category[];
  className?: string;
}
// const cats = [
//   { id: 1, name: "Pizzas" },
//   { id: 2, name: "Combo" },
//   { id: 3, name: "Appetizers" },
//   { id: 4, name: "Cocktails" },
//   { id: 5, name: "Coffee" },
//   { id: 6, name: "Drinks" },
//   { id: 7, name: "Desserts" },
// ];

export const Categories: React.FC<Props> = ({ className, items }) => {
  const categoryActiveId = useCategoryStore(store => store.activeId);
  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {items.map(({ name, id }) => (
        <a
          key={id}
          href={`/#${name}`}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5 hover:bg-white  hover:shadow-gray-200  hover:text-primary",
            categoryActiveId === id && "bg-white shadow-gray-200 text-primary"
          )}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
