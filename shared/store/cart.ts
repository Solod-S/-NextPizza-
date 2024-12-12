import { create } from "zustand";
import { Api } from "../services/api-client";
import { getCartDetails } from "../lib";
import { CartStateItem } from "../lib/get-cart-details";
import { CreateCartItemsValuesDTO } from "../services/dto/cart.dto";

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

// export const useCartStore = create<CartState>()((set, get) => ({
export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(`Error in fetchCartItems store:`, error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      console.error(`Error in updateItemQuantity store:`, error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  removeCartItem: async (id: number) => {
    try {
      set(state => ({
        loading: true,
        error: false,
        items: state.items.map(item =>
          item.id === id ? { ...item, disabled: true } : item
        ),
      }));
      const data = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (error) {
      console.error(`Error in removeCartItem store:`, error);
      set({ error: true });
    } finally {
      // set({ loading: false });
      set(state => ({
        loading: false,
        items: state.items.map(item =>
          item.id === id ? { ...item, disabled: false } : item
        ),
      }));
    }
  },
  addCartItem: async (values: CreateCartItemsValuesDTO) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (error) {
      console.error(`Error in removeCartItem store:`, error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
