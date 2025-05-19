import { CartItem } from '@shared/schema';

const CART_STORAGE_KEY = 'shopease_cart';

export const saveCart = (cartItems: CartItem[]): void => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
};

export const getCart = (): CartItem[] => {
  const cartData = localStorage.getItem(CART_STORAGE_KEY);
  return cartData ? JSON.parse(cartData) : [];
};

export const clearCart = (): void => {
  localStorage.removeItem(CART_STORAGE_KEY);
};
