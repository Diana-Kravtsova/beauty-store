import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WishlistItem, WishlistState } from '../types';

const loadWishlistFromStorage = (): WishlistState => {
  const saved = localStorage.getItem('wishlist');
  return saved ? JSON.parse(saved) : { items: [] };
};

const initialState: WishlistState = loadWishlistFromStorage();

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.items.push(action.payload);
        localStorage.setItem('wishlist', JSON.stringify(state));
      }
    },

    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state));
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
