import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';

import cartSlice from './cart-slice';
import uiSlice from './ui-slice';
import favouritesSlice from './favourite-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
    favourites: favouritesSlice.reducer,
  },
});

export default store;
