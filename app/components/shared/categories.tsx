"use client";
import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store";
import { Category } from "@prisma/client";
import React from "react";

interface Props {
  items: Category[];
  className?: string;
}

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
