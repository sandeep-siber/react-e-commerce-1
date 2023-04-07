import { createSlice } from '@reduxjs/toolkit';

const favouriteSlice = createSlice({
  name: 'favourites',

  initialState: {
    items: [],
    changed: false,
  },

  reducers: {
    addItemToFavourite(state, action) {
      const favouriteItem = action.payload;
      state.changed = true;
      state.items.push(favouriteItem);
    },

    replaceFavourite(state, action) {
      state.items = action.payload.items;
    },

    removeItemFromFavourite(state, action) {
      const id = action.payload;
      state.changed = true;
      state.items = state.items.filter((item) => item.id !== id);
    },

    clearFavourite(state, action) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.changed = true;
    },
  },
});

export const favouriteActions = favouriteSlice.actions;
export default favouriteSlice;
