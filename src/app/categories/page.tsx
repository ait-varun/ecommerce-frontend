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
import { Filter } from 'lucide-react';

export default function Categories() {
  const { 
    products,
    setProducts, 
    selectedCategory, 
    setSelectedCategory, 
    filteredProducts, 
    categories,
    isLoginModalOpen,
    setIsLoginModalOpen,
    loginModalMode,
    setLoginModalMode
  } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const fetchedProducts = await ProductService.getProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };
    fetchProducts();
  }, [setProducts]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Categories</h1>

          {/* Category Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
            <motion.button
              onClick={() => handleCategoryChange('all')}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold">{products.length}</div>
                <div className="text-sm font-medium">All Products</div>
              </div>
            </motion.button>
            
            {categories.map(category => {
              const categoryCount = products.filter(p => p.category === category).length;
              return (
                <motion.button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedCategory === category
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold">{categoryCount}</div>
                    <div className="text-sm font-medium">{category}</div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Current Selection Display */}
          <div className="flex items-center space-x-4 mb-6">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-lg font-medium text-gray-700">
              Showing: {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
              <span className="text-gray-500 ml-2">({filteredProducts.length} products)</span>
            </span>
          </div>

          {/* Products Display */}
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
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No products found</p>
                </div>
              ) : (
                filteredProducts.map((product: Product, index: number) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
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
