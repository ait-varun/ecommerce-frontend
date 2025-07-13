import { Product } from '@/types';
import { mockProducts } from '@/data/mockData';
import { loadProductsFromStorage, saveProductsToStorage } from '@/utils/localStorage';

export class ProductService {
  static async getProducts(): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let products = loadProductsFromStorage();
        
        // If no products in localStorage, use mock data
        if (products.length === 0) {
          products = mockProducts;
          saveProductsToStorage(products);
        }
        
        resolve(products);
      }, 500); // Simulate API delay
    });
  }

  static async getProduct(id: string): Promise<Product | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = loadProductsFromStorage();
        const product = products.find(p => p.id === id);
        resolve(product || null);
      }, 300); // Simulate API delay
    });
  }

  static async searchProducts(query: string): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = loadProductsFromStorage();
        const filtered = products.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 300); // Simulate API delay
    });
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = loadProductsFromStorage();
        const filtered = products.filter(product => 
          product.category.toLowerCase() === category.toLowerCase()
        );
        resolve(filtered);
      }, 300); // Simulate API delay
    });
  }

  static getCategories(): string[] {
    const products = loadProductsFromStorage();
    return [...new Set(products.map(product => product.category))];
  }
}
