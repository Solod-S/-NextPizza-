import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React, { useState } from "react";

interface PriceRangeProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFiltersProps extends PriceRangeProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  // prices: Set<string>;
  priceFrom?: number;
  priceTo?: number;
}
interface ReturnProps extends Filters {
  setPrice: (name: keyof PriceRangeProps, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  // const router = useRouter();
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFiltersProps,
    string
  >;

  // Фильтр ингридиентов
  const [selectedIngredients, { toggle: toogleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  );

  // Фильтр размеров
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.get("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );

  // Фильтр типа пиццы
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.get("pizzaTypes")
        ? searchParams.get("pizzaTypes")?.split(",")
        : []
    )
  );

  // Фильтр стоимости
  const [{ priceFrom, priceTo }, setPrice] = useState<PriceRangeProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPrice(prevState => ({ ...prevState, [name]: value }));
  };

  return React.useMemo(
    () => ({
      sizes,
      pizzaTypes,
      selectedIngredients,
      priceFrom,
      priceTo,
      setPrice: updatePrice,
      setPizzaTypes: togglePizzaTypes,
      setIngredients: toogleIngredients,
      setSizes: toggleSizes,
    }),
    [sizes, pizzaTypes, selectedIngredients, priceFrom, priceTo]
  );
};
