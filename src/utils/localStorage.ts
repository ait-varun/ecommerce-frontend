import { User, CartItem, Product } from '@/types';

export const LOCAL_STORAGE_KEYS = {
  USER: 'ecommerce_user',
  CART: 'ecommerce_cart',
  PRODUCTS: 'ecommerce_products',
  USERS: 'ecommerce_users',
  ORDERS: 'ecommerce_orders',
};

export const getFromLocalStorage = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting item from localStorage: ${error}`);
    return null;
  }
};

export const setToLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item to localStorage: ${error}`);
  }
};

export const removeFromLocalStorage = (key: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from localStorage: ${error}`);
  }
};

export const loadUserFromStorage = (): User | null => {
  return getFromLocalStorage<User>(LOCAL_STORAGE_KEYS.USER);
};

export const saveUserToStorage = (user: User): void => {
  setToLocalStorage(LOCAL_STORAGE_KEYS.USER, user);
};

export const loadCartFromStorage = (): CartItem[] => {
  return getFromLocalStorage<CartItem[]>(LOCAL_STORAGE_KEYS.CART) || [];
};

export const saveCartToStorage = (cart: CartItem[]): void => {
  setToLocalStorage(LOCAL_STORAGE_KEYS.CART, cart);
};

export const loadProductsFromStorage = (): Product[] => {
  return getFromLocalStorage<Product[]>(LOCAL_STORAGE_KEYS.PRODUCTS) || [];
};

export const saveProductsToStorage = (products: Product[]): void => {
  setToLocalStorage(LOCAL_STORAGE_KEYS.PRODUCTS, products);
};
