'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { useCart } from '@/hooks/useCart';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen } = useAppContext();
  const { cart, total, removeFromCart, clearCart, updateQuantity } = useCart();

  const handleClose = () => {
    setIsCartOpen(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white shadow-xl w-full max-w-md h-full flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <h2 className="text-lg font-bold">Shopping Cart</h2>
              <button
                onClick={handleClose}
                className="text-[var(--color-text-light)] hover:text-[var(--color-text-secondary)]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty</p>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li key={item.id} className="flex items-center">
                      <div className="relative w-16 h-16 mr-4">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <div className="flex items-center mt-2">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value))
                            }
                            className="w-16 border-b-2 border-gray-300 text-center mx-2"
                          />
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[var(--color-error)] hover:text-[var(--color-error-hover)]"
                          >
                            <Trash className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-600 font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t p-4">
              <div className="flex justify-between mb-4">
                <span className="font-bold">Total</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
              <button
                className="w-full bg-[var(--color-primary)] text-white py-2 px-4 rounded-md hover:bg-[var(--color-primary-hover)]"
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </button>
              <button
                className="w-full mt-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                onClick={clearCart}
                disabled={cart.length === 0}
              >
                Clear Cart
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

