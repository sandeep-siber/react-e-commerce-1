import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',

  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    changed: false,
  },

  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      // state.totalQuantity++;
      state.totalQuantity += newItem.quantity;
      state.totalAmount = state.totalAmount + newItem.price * newItem.quantity;
      state.changed = true;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          imageUrl: newItem.imageUrl,
          description: newItem.description,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.price * newItem.quantity,
        });
      } else {
        // existingItem.quantity++;
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice =
          existingItem.totalPrice + newItem.price * newItem.quantity;
      }
    },

    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }

      state.totalAmount = state.totalAmount - existingItem.price;
    },

    clearCart(state, action) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.changed = true;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
