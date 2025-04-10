import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchOrderHeader,
} from "../services/fetchOrderHeader";
import { IOrderHeader, OrderHeaderSchema } from "../types/orderHeader";

const initialState: OrderHeaderSchema = {
  isLoading: false,
};

const orderHeaderSlice = createSlice({
  name: "orders/id",
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(fetchOrderHeader.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchOrderHeader.fulfilled, (state, action: PayloadAction<IOrderHeader>) => {
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(fetchOrderHeader.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: orderHeaderActions } = orderHeaderSlice;
export const { reducer: orderHeaderReducer } = orderHeaderSlice;
