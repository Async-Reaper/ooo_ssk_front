import { createSlice } from "@reduxjs/toolkit";
import { AuthSchema } from "../types/authTypes";
import { authUser } from "../services/authUser";

const initialState: AuthSchema = {
  isLoading: false,
  isSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(authUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(authUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      document.cookie = `access_token=${action.payload.JWT}`;
    })
    .addCase(authUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: authAction } = authSlice;
export const { reducer: authReducer } = authSlice;
