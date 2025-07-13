'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Plus, Minus, Trash } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

export default function ProductCard({ product, onProductClick }: ProductCardProps) {
  const { addToCart, isInCart, removeFromCart, cart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, quantity);
    setShowQuantitySelector(false);
    setQuantity(1);
  };

  const incrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleQuantitySelector = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowQuantitySelector(!showQuantitySelector);
  };

  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Find the cart item ID for this product
    const cartItem = cart.find(item => item.productId === product.id);
    if (cartItem) {
      removeFromCart(cartItem.id);
    }
  };

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleCardClick = () => {
    onProductClick?.(product);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group"
      whileHover={!showQuantitySelector ? { y: -5, scale: 1.02 } : {}}
      whileTap={!showQuantitySelector ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleCardClick}
    >
      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {/* Wishlist Button */}
        <motion.button
          onClick={handleLikeToggle}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
          />
        </motion.button>

        {/* Stock Badge */}
        {product.stock < 10 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Only {product.stock} left
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-500 ml-2">
            ({product.reviews.length} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Fixed height container for buttons */}
          <div className="relative flex items-center space-x-2 h-10">
            {/* Quantity Selector - positioned absolutely */}
            {showQuantitySelector && (
              <motion.div
                className="absolute right-0 top-0 flex items-center space-x-1 bg-white border border-gray-300 rounded-md p-1 shadow-lg z-10"
                initial={{ opacity: 0, scale: 0.8, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={decrementQuantity}
                  className="w-6 h-6 rounded-full bg-[var(--color-border-light)] flex items-center justify-center hover:bg-[var(--color-border-medium)] text-xs"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center text-xs font-medium">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="w-6 h-6 rounded-full bg-[var(--color-border-light)] flex items-center justify-center hover:bg-[var(--color-border-medium)] text-xs"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-3 h-3" />
                </button>
                <button
                  onClick={handleAddToCart}
                  className="ml-1 px-2 py-1 bg-[var(--color-primary)] text-white text-xs rounded hover:bg-[var(--color-primary-hover)]"
                >
                  Add
                </button>
                <button
                  onClick={toggleQuantitySelector}
                  className="ml-1 w-5 h-5 flex items-center justify-center text-[var(--color-text-light)] hover:text-[var(--color-text-secondary)]"
                >
                  ×
                </button>
              </motion.div>
            )}

            {/* Main Buttons - always visible when quantity selector is hidden */}
            {!showQuantitySelector && (
              <div className="flex items-center space-x-1">
                {/* Show Qty button only if item is not in cart */}
                {!isInCart(product.id) && (
                  <motion.button
                    onClick={toggleQuantitySelector}
                    className="px-2 py-1 text-xs bg-[var(--color-border-light)] text-[var(--color-text-secondary)] rounded hover:bg-[var(--color-border-medium)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={product.stock === 0}
                  >
                    Qty
                  </motion.button>
                )}
                
                {/* Add to Cart or Remove Button */}
                {!isInCart(product.id) ? (
                  <motion.button
                    onClick={toggleQuantitySelector}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md font-medium transition-colors text-sm bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>
                      {product.stock === 0 ? 'Out of Stock' : 'Add'}
                    </span>
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleRemoveFromCart}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md font-medium transition-colors text-sm bg-[var(--color-error)] text-white hover:bg-[var(--color-error-hover)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash className="w-4 h-4" />
                    <span>Remove</span>
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
