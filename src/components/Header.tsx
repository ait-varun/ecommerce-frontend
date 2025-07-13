'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X 
} from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { useAuth } from '@/hooks/useAuth';
import { getCurrentTheme } from '@/config/themes';

export default function Header() {
  const { 
    searchQuery, 
    setSearchQuery, 
    setIsCartOpen, 
    setIsLoginModalOpen, 
    cartItemCount 
  } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuth();
  const theme = getCurrentTheme();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.header 
      className="bg-white shadow-md sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h1 className="text-2xl font-bold text-[var(--color-primary)]">
              {theme.logo?.text || theme.displayName}
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-[var(--color-text-primary)] hover:text-[var(--color-primary)] px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/products" className="text-[var(--color-text-primary)] hover:text-[var(--color-primary)] px-3 py-2 rounded-md text-sm font-medium">
                Products
              </Link>
              <Link href="/categories" className="text-[var(--color-text-primary)] hover:text-[var(--color-primary)] px-3 py-2 rounded-md text-sm font-medium">
                Categories
              </Link>
            </div>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-2 border border-[var(--color-border-light)] rounded-md leading-5 bg-[var(--color-surface)] placeholder-[var(--color-text-light)] focus:outline-none focus:placeholder-[var(--color-text-secondary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <motion.button
              onClick={handleCartClick}
              className="relative p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-[var(--color-error)] text-white text-xs rounded-full h-6 w-6 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {cartItemCount}
                </motion.span>
              )}
            </motion.button>

            {/* User Button */}
            {isAuthenticated ? (
              <div className="relative group">
                <motion.button
                  className="flex items-center space-x-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  whileHover={{ scale: 1.05 }}
                >
                  <User className="h-6 w-6" />
                  <span className="hidden sm:block">{user?.name}</span>
                </motion.button>
                <div className="absolute right-0 mt-2 w-48 bg-[var(--color-surface)] rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-primary-light)]">
                    Profile
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-primary-light)]">
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-primary-light)]"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <motion.button
                onClick={handleLoginClick}
                className="flex items-center space-x-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="h-6 w-6" />
                <span className="hidden sm:block">Login</span>
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link href="/" className="text-[var(--color-text-primary)] hover:text-[var(--color-primary)] block px-3 py-2 rounded-md text-base font-medium">
                Home
              </Link>
              <Link href="/products" className="text-[var(--color-text-primary)] hover:text-[var(--color-primary)] block px-3 py-2 rounded-md text-base font-medium">
                Products
              </Link>
              <Link href="/categories" className="text-[var(--color-text-primary)] hover:text-[var(--color-primary)] block px-3 py-2 rounded-md text-base font-medium">
                Categories
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
