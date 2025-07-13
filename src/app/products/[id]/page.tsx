'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Product } from '@/types';
import { ProductService } from '@/services/productService';
import { useCart } from '@/hooks/useCart';
import { useAppContext } from '@/contexts/AppContext';
import Header from '@/components/Header';
import LoginModal from '@/components/LoginModal';
import CartDrawer from '@/components/CartDrawer';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  const { isLoginModalOpen, setIsLoginModalOpen, loginModalMode, setLoginModalMode } = useAppContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (params.id) {
        setLoading(true);
        const fetchedProduct = await ProductService.getProduct(params.id as string);
        setProduct(fetchedProduct);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Products</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <motion.div
                className="aspect-square bg-white rounded-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
              
              {/* Stock Badge */}
              {product.stock < 10 && (
                <div className="text-center">
                  <span className="inline-block bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full">
                    Only {product.stock} left in stock
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews.length} reviews)
                </span>
              </div>

              <div className="text-4xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <button
                    onClick={decrementQuantity}
                      className="w-8 h-8 rounded-full bg-[var(--color-border-light)] flex items-center justify-center hover:bg-[var(--color-border-medium)]"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                    onClick={incrementQuantity}
                      className="w-8 h-8 rounded-full bg-[var(--color-border-light)] flex items-center justify-center hover:bg-[var(--color-border-medium)]"
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-md font-medium transition-colors ${
                      isInCart(product.id)
                        ? 'bg-[var(--color-success)] text-white hover:bg-[var(--color-success-hover)]'
                        : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>
                      {product.stock === 0
                        ? 'Out of Stock'
                        : isInCart(product.id)
                        ? 'Added to Cart'
                        : 'Add to Cart'
                      }
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-3 border-2 border-[var(--color-border-medium)] rounded-md hover:border-[var(--color-error)] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart 
                      className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
                    />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <motion.div
                  key={review.id}
                  className="bg-white p-6 rounded-lg shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{review.userName}</span>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      <CartDrawer />
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        mode={loginModalMode}
        onModeChange={setLoginModalMode}
      />
    </div>
  );
}
