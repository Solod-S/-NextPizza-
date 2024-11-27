import { ProductItem } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from "@/app/components/shared/group-variants";

/**
 *  * Функция для получения доступных размеров (вариантов) пиццы
 *
 * @param type - тип выбранной пиццы
 * @param items - все виды пиц
 *
 * @returns - возвращает {name, value, disabled}[]
 */

export const getAvailablePizzaSizes = (
  type: PizzaType,
  items: ProductItem[]
): Variant[] => {
  // исключаем по типу теста (traditional и thin)
  const filteredPizzasByType = items.filter(item => item.pizzaType === type);
  // делаем статус дисейблед тому чего нету
  const availablePizzaSizes = pizzaSizes.map(item => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(
      pizza => Number(pizza.size) === Number(item.value)
    ),
  }));
  return availablePizzaSizes;
};
