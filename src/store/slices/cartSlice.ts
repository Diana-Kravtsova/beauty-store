import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, Product } from '../types';

const calculateDiscountedPrice = (product: Product): number => {
  if (product.discountPercentage > 0) {
    return product.price * (1 - product.discountPercentage / 100);
  }
  return product.price;
};

const loadCartFromStorage = (): CartState => {
  const saved = localStorage.getItem('cart');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return { items: [], totalQuantity: 0, totalAmount: 0 };
    }
  }
  return { items: [], totalQuantity: 0, totalAmount: 0 };
};

const initialState: CartState = loadCartFromStorage();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      const discountedPrice = calculateDiscountedPrice(product);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.total = existingItem.quantity * product.price;
      } else {
        state.items.push({
          product,
          quantity,
          total: discountedPrice * quantity,
        });
      }

      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce((sum, item) => sum + item.total, 0);

      localStorage.setItem('cart', JSON.stringify(state));
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);

      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce((sum, item) => sum + item.total, 0);

      localStorage.setItem('cart', JSON.stringify(state));
    },

    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.product.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
        const discountedPrice = calculateDiscountedPrice(item.product);
        item.total = discountedPrice * item.quantity;
      }

      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce((sum, item) => sum + item.total, 0);

      localStorage.setItem('cart', JSON.stringify(state));
    },

    clearCart: state => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
