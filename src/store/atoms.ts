import { atom } from 'recoil';
import { AuthState, CartItem, Product } from '@/types';

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  },
});

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
});

export const productsState = atom<Product[]>({
  key: 'productsState',
  default: [],
});

export const searchQueryState = atom<string>({
  key: 'searchQueryState',
  default: '',
});

export const selectedCategoryState = atom<string>({
  key: 'selectedCategoryState',
  default: 'all',
});

export const isCartOpenState = atom<boolean>({
  key: 'isCartOpenState',
  default: false,
});

export const isLoginModalOpenState = atom<boolean>({
  key: 'isLoginModalOpenState',
  default: false,
});

export const isSignupModalOpenState = atom<boolean>({
  key: 'isSignupModalOpenState',
  default: false,
});
