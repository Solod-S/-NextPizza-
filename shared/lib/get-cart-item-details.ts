import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
  ingredients: CartStateItem["ingredients"],
  pizzaType: PizzaType,
  pizzaSize: PizzaSize
): string => {
  const details = [];
  console.log(`pizzaSize`, pizzaSize);
  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} sm`);
  }

  if (ingredients) {
    details.push(...ingredients.map(i => i.name));
  }
  return details.join(", ");
};
