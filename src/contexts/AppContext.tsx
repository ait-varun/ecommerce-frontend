'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem } from '@/types';

interface AppContextType {
  // Product state
  products: Product[];
  setProducts: (products: Product[]) => void;
  
  // Search and filter state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  
  // Cart state
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  
  // Modal state
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
  loginModalMode: 'login' | 'signup';
  setLoginModalMode: (mode: 'login' | 'signup') => void;
  
  // Computed values
  filteredProducts: Product[];
  cartTotal: number;
  cartItemCount: number;
  categories: string[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalMode, setLoginModalMode] = useState<'login' | 'signup'>('login');

  // Computed values
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const categories = [...new Set(products.map(product => product.category))];

  return (
    <AppContext.Provider value={{
      products,
      setProducts,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      cart,
      setCart,
      isCartOpen,
      setIsCartOpen,
      isLoginModalOpen,
      setIsLoginModalOpen,
      loginModalMode,
      setLoginModalMode,
      filteredProducts,
      cartTotal,
      cartItemCount,
      categories
    }}>
      {children}
    </AppContext.Provider>
  );
};
