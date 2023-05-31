import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const userReducer = createReducer(initialState, {
  LoginRequest: (state) => {
    state.loading = true;
  },
  LoginSuccess: (state, action) => {
    state.loading = false;
    state.error = null;
    state.data = action.payload;
    state.isAuthenticated = true;
  },
  LoginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  LogoutRequest: (state) => {
    state.loading = true;
  },
  LogoutSuccess: (state, action) => {
    state.loading = false;
    state.error = null;
    state.data = null;
    state.isAuthenticated = false;
  },
  LogoutFailure: (state, action) => {
    state.loading = false;
    state.error = "Logout Failed";
    state.isAuthenticated = true;
  }
});
