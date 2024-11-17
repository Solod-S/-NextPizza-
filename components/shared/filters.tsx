"use client";
import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilterIngredients } from "@/app/hooks/useFilterIngredients";

interface Props {
  className?: string;
}

// const testIngredients = [
//   { value: "Cheese", text: "Cheese" },
//   { value: "Tomato", text: "Tomato" },
//   { value: "Onion", text: "Onion" },
//   { value: "Mushroom", text: "Mushroom" },
//   { value: "Pepperoni", text: "Pepperoni" },
//   { value: "Olives", text: "Olives" },
//   { value: "BellPepper", text: "Bell Pepper" },
//   { value: "Basil", text: "Basil" },
//   { value: "Pineapple", text: "Pineapple" },
//   { value: "Bacon", text: "Bacon" },
//   { value: "Sausage", text: "Sausage" },
//   { value: "Chicken", text: "Chicken" },
//   { value: "Spinach", text: "Spinach" },
//   { value: "Garlic", text: "Garlic" },
//   { value: "Artichoke", text: "Artichoke" },
// ];

export const FIlters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients();

  const items = ingredients.map(i => ({ value: i.name, text: i.name }));

  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />

      {/* Верхние чекбоксы */}
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Сan collect it" value="1" />
        <FilterCheckbox text="New" value="2" />
      </div>

      {/* Фильтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price Range</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={50}
            defaultValue={0}
          />
          <Input type="number" placeholder="50" min={10} max={50} />
        </div>
        <RangeSlider min={0} max={50} step={1} />
      </div>

      <CheckboxFiltersGroup
        className="mt-5"
        title="Ingredients"
        items={items}
        defaultItems={items}
        loading={loading}
        onClickCheckbox={onAddId}
        selectedIds={selectedIds}
      />
    </div>
  );
};
