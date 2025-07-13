import { CartItem, Product } from '@/types';
import { loadCartFromStorage, saveCartToStorage } from '@/utils/localStorage';
import { v4 as uuidv4 } from 'uuid';

export class CartService {
  static getCart(): CartItem[] {
    return loadCartFromStorage();
  }

  static addToCart(product: Product, quantity: number = 1): CartItem[] {
    const cart = loadCartFromStorage();
    const existingItem = cart.find(item => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem: CartItem = {
        id: uuidv4(),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
      };
      cart.push(newItem);
    }

    saveCartToStorage(cart);
    return cart;
  }

  static removeFromCart(itemId: string): CartItem[] {
    const cart = loadCartFromStorage();
    const updatedCart = cart.filter(item => item.id !== itemId);
    saveCartToStorage(updatedCart);
    return updatedCart;
  }

  static updateQuantity(itemId: string, quantity: number): CartItem[] {
    const cart = loadCartFromStorage();
    const item = cart.find(item => item.id === itemId);
    
    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(itemId);
      }
      item.quantity = quantity;
      saveCartToStorage(cart);
    }
    
    return cart;
  }

  static clearCart(): void {
    saveCartToStorage([]);
  }

  static getCartTotal(): number {
    const cart = loadCartFromStorage();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  static getCartItemCount(): number {
    const cart = loadCartFromStorage();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
}
