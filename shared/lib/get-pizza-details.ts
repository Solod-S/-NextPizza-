import { Ingredient, ProductItem } from "@prisma/client";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  let textDetails = `${size} sm, ${mapPizzaType[type]} pizza`;
  if (selectedIngredients.size > 0)
    textDetails += `, ingredients (${selectedIngredients.size})`;
  return { totalPrice, textDetails };
};
