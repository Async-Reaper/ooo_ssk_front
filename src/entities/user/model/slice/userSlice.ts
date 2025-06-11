import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie } from "@shared/libs/cookie";
import { UserSchema } from "../types/userTypes";
import { initUserAuthData } from "../services/initUserAuthData/initUserAuthData";

const initialState: UserSchema = {
  _inited: false,
  isLoading: false,
  error: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.data = undefined;
      localStorage.removeItem("matrix");
      deleteCookie("access_token");
    },
  },
  extraReducers: (builder) => builder
    .addCase(initUserAuthData.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    })
    .addCase(initUserAuthData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state._inited = true;
    })
    .addCase(initUserAuthData.rejected, (state, action) => {
      state.isLoading = false;
      state._inited = true;
      state.error = action.payload;
    }),
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
