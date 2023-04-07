import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  token: null,
  isAuthenticated: false,
  showAuth: false,
};

const authSlice = createSlice({
  name: 'auth',

  initialState: initialAuthState,

  reducers: {
    login(state, action) {
      const token = action.payload;
      state.token = token;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
    },
    toggleAuth(state) {
      state.showAuth = !state.showAuth;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
