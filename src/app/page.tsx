'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { useAppContext } from '@/contexts/AppContext';
import { ProductService } from '@/services/productService';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import LoginModal from '@/components/LoginModal';
import CartDrawer from '@/components/CartDrawer';
import { getCurrentTheme } from '@/config/themes';

export default function Home() {
  const { products, setProducts, filteredProducts, isLoginModalOpen, setIsLoginModalOpen, loginModalMode, setLoginModalMode } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const theme = getCurrentTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const fetchedProducts = await ProductService.getProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };
    fetchProducts();
  }, [setProducts]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        className="gradient-hero text-inverse py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to {theme.displayName}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover amazing products at unbeatable prices
          </motion.p>
          <motion.button 
            className="bg-white text-[var(--color-primary)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--color-primary-light)] transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </motion.button>
        </div>
      </motion.section>

      {/* Products Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {filteredProducts.map((product: Product, index: number) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard 
                    product={product} 
                    onProductClick={handleProductClick}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ShopZen</h3>
              <p className="text-gray-400">Your one-stop shop for amazing products</p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">Products</a></li>
                <li><a href="#" className="hover:text-white">Categories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Shipping</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ShopZen. All rights reserved.</p>
          </div>
        </div>
      </footer>

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
