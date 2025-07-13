import { selector } from 'recoil';
import { cartState, productsState, searchQueryState, selectedCategoryState } from './atoms';

export const cartTotalState = selector({
  key: 'cartTotalState',
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
});

export const cartItemCountState = selector({
  key: 'cartItemCountState',
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((count, item) => count + item.quantity, 0);
  },
});

export const filteredProductsState = selector({
  key: 'filteredProductsState',
  get: ({ get }) => {
    const products = get(productsState);
    const searchQuery = get(searchQueryState);
    const selectedCategory = get(selectedCategoryState);

    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  },
});

export const categoriesState = selector({
  key: 'categoriesState',
  get: ({ get }) => {
    const products = get(productsState);
    const categories = [...new Set(products.map(product => product.category))];
    return categories;
  },
});
