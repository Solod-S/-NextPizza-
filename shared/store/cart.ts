import { create } from "zustand";
import { Api } from "../services/api-client";
import { getCartDetails } from "../lib";
import { CartStateItem } from "../lib/get-cart-details";

interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  /*Получение товаров из корзины*/
  fetchCartItems: () => Promise<void>;

  /*Запрос на обновление количества товаров*/
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  /*Запрос на добавление товаров в корзину*/
  // TODO типизацию
  addCartItem: (values: any) => Promise<void>;

  /*Запрос на удаление товаров из корзины*/
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.fetchCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(`Error in useCartStore:`, error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {},

  addCartItem: async (values: any) => {},

  removeCartItem: async (id: number) => {},
}));
