"use client";
import React from "react";
import { Title } from "./title";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useQueryFilters, useIngredients, useFilters } from "@/app/hooks";

interface Props {
  className?: string;
}

export const FIlters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);
  const items = ingredients.map(i => ({ value: i.name, text: i.name }));

  const updatePrices = (prices: number[]) => {
    // filters.setPrice({ priceFrom: prices[0], priceTo: prices[1] });
    filters.setPrice("priceFrom", prices[0]);
    filters.setPrice("priceTo", prices[1]);
  };

  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />

      {/* Верхние чекбоксы */}
      <div className="flex flex-col gap-4">
        <CheckboxFiltersGroup
          title="Pizza crust type"
          className="mb-5"
          defaultItems={[
            { text: "thin", value: "1" },
            { text: "thick", value: "2" },
          ]}
          onClickCheckbox={filters.setPizzaTypes}
          selectedValues={filters.pizzaTypes}
          items={[
            { text: "thin crust", value: "1" },
            { text: "thick crust", value: "2" },
          ]}
        />

        <CheckboxFiltersGroup
          title="Sizes"
          className="mb-5"
          defaultItems={[
            { text: "20 sm", value: "20" },
            { text: "30 sm", value: "30" },
            { text: "40 sm", value: "40" },
          ]}
          onClickCheckbox={filters.setSizes}
          selectedValues={filters.sizes}
          items={[
            { text: "20 sm", value: "20" },
            { text: "30 sm", value: "30" },
            { text: "40 sm", value: "40" },
          ]}
        />
      </div>

      {/* Фильтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price Range</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={500}
            // defaultValue={0}
            value={String(filters.priceFrom)}
            onChange={e =>
              filters.setPrice("priceFrom", Number(e.target.value))
            }
          />
          <Input
            type="number"
            placeholder="50"
            min={10}
            max={500}
            value={String(filters.priceTo)}
            onChange={e => filters.setPrice("priceTo", Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={500}
          step={10}
          value={[filters.priceFrom || 0, filters.priceTo || 500]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckboxFiltersGroup
        className="mt-5"
        title="Ingredients"
        items={items}
        defaultItems={items}
        loading={loading}
        onClickCheckbox={filters.setIngredients}
        selectedValues={filters.selectedIngredients}
      />
    </div>
  );
};
