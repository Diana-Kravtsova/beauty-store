import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '../types';

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
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const quantityToAdd = action.payload.quantity || 1;
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
        existingItem.total = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: quantityToAdd,
          total: action.payload.price
        });
      }

      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce((sum, item) => sum + item.total, 0);

      localStorage.setItem('cart', JSON.stringify(state));
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);

      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce((sum, item) => sum + item.total, 0);

      localStorage.setItem('cart', JSON.stringify(state));
    },

    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
        item.total = item.price * item.quantity;
      }

      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce((sum, item) => sum + item.total, 0);

      localStorage.setItem('cart', JSON.stringify(state));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
