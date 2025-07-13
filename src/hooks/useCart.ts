import { useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { CartService } from '@/services/cartService';
import { Product } from '@/types';

export const useCart = () => {
  const { cart, setCart, cartTotal, cartItemCount } = useAppContext();

  // Initialize cart from localStorage
  useEffect(() => {
    const savedCart = CartService.getCart();
    setCart(savedCart);
  }, [setCart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    const updatedCart = CartService.addToCart(product, quantity);
    setCart(updatedCart);
  };

  const removeFromCart = (itemId: string) => {
    const updatedCart = CartService.removeFromCart(itemId);
    setCart(updatedCart);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    const updatedCart = CartService.updateQuantity(itemId, quantity);
    setCart(updatedCart);
  };

  const clearCart = () => {
    CartService.clearCart();
    setCart([]);
  };

  const isInCart = (productId: string) => {
    return cart.some(item => item.productId === productId);
  };

  const getItemQuantity = (productId: string) => {
    const item = cart.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  return {
    cart,
    total: cartTotal,
    itemCount: cartItemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };
};
