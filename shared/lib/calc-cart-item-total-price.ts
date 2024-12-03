import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartTotalPrice = (item: CartItemDTO): number => {
  const totalIngredientsPrice = item.ingredients.reduce(
    (acc, item) => acc + item.price,
    0
  );
  const productPrice = item.productItem.price;
  const quantity = item.quantity;

  return (totalIngredientsPrice + productPrice) * quantity;
};
