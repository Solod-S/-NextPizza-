import { Ingredient, ProductItem } from "@prisma/client";
import { roundMoney } from "./round-money";
import { PizzaSize, PizzaType } from "../constants/pizza";
/**
 * Функция для подсчета общей стоимости
 *
 * @param type - тип выбраноной пиццы
 * @param size - размер выбранной пиццы
 * @param items - список вариаций
 * @param ingredients - список ингридиентов
 * @param selectedIngredients - выбранные ингридиенты
 *
 *  @returns number общая стоимость
 */
export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    items.find(item => item.pizzaType === type && item.size === size)?.price ||
    0;

  const totalIngredientsPrice = ingredients
    .filter(item => selectedIngredients.has(item.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return roundMoney(pizzaPrice + totalIngredientsPrice);
};
