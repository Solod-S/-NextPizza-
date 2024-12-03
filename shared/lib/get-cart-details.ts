import { CartDTO } from "../services/dto/cart.dto";
import { calcCartTotalPrice } from "./calc-cart-item-total-price";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const formatedItems = data.items.map(item => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: calcCartTotalPrice(item),
    pizzaSizes: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    ingredients: item.ingredients.map(ing => ({
      name: ing.name,
      price: ing.price,
    })),
  }));

  return {
    items: formatedItems,
    totalAmount: data.totalAmount,
  };
};
