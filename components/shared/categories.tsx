import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}
const cats = [
  "Pizzas",
  "Combo",
  "Appetizers",
  "Cocktails",
  "Coffee",
  "Drinks",
  "Desserts",
  "Desserts",
];
const activeIndex = 0;

export const Categories: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {cats.map((cat, i) => (
        <a
          key={i}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5 hover:bg-white  hover:shadow-gray-200  hover:text-primary",
            activeIndex === i && "bg-white shadow-gray-200 text-primary"
          )}
        >
          <button>{cat}</button>
        </a>
      ))}
    </div>
  );
};
