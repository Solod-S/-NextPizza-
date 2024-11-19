"use client";
import React, { useEffect, useState } from "react";
import { Title } from "./title";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilterIngredients } from "@/app/hooks/use-filter-ingredients";
import { useSearchParam, useSet } from "react-use";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";
interface Props {
  className?: string;
}

interface PriceRangeProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFiltersProps extends PriceRangeProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
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
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFiltersProps,
    string
  >;
  const router = useRouter();
  const { ingredients, loading, onAddId, selectedIngredients } =
    useFilterIngredients(searchParams.get("ingredients")?.split(","));
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.get("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.get("pizzaTypes")
        ? searchParams.get("pizzaTypes")?.split(",")
        : []
    )
  );
  const [{ priceFrom, priceTo }, setPrice] = useState<PriceRangeProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const items = ingredients.map(i => ({ value: i.name, text: i.name }));

  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPrice(prevState => ({ ...prevState, [name]: value }));
  };

  console.log(`searchParams`, 999);

  useEffect(() => {
    const filters = {
      priceFrom,
      priceTo,
      pizzaTypes: Array.from(pizzaTypes),
      sizes: Array.from(sizes),
      ingredients: Array.from(selectedIngredients),
    };

    const query = qs.stringify(filters, { arrayFormat: "comma" });
    router.push(`?${query}`, { scroll: false });
    console.log(`filters`, filters);
    console.log(`query`, query);
  }, [priceFrom, priceTo, sizes, selectedIngredients, pizzaTypes]);

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
          onClickCheckbox={togglePizzaTypes}
          selectedValues={pizzaTypes}
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
          onClickCheckbox={toggleSizes}
          selectedValues={sizes}
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
            value={String(priceFrom)}
            onChange={e => updatePrice("priceFrom", Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="50"
            min={10}
            max={500}
            value={String(priceTo)}
            onChange={e => updatePrice("priceTo", Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={500}
          step={10}
          value={[priceFrom || 0, priceTo || 500]}
          onValueChange={([priceFrom, priceTo]) =>
            setPrice({ priceFrom, priceTo })
          }
        />
      </div>

      <CheckboxFiltersGroup
        className="mt-5"
        title="Ingredients"
        items={items}
        defaultItems={items}
        loading={loading}
        onClickCheckbox={onAddId}
        selectedValues={selectedIngredients}
      />
    </div>
  );
};
