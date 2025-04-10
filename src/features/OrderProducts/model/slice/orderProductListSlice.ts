import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchOrderProductList,
} from "../services/fetchOrderProductList";
import { IOrderProductsList, OrderProductsListSchema } from "../types/orderProductsList";

const initialState: OrderProductsListSchema = {
  isLoading: false,
};

const orderProductListSlice = createSlice({
  name: "orders/id",
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(fetchOrderProductList.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchOrderProductList.fulfilled, (state, action: PayloadAction<IOrderProductsList>) => {
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(fetchOrderProductList.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: orderProductListActions } = orderProductListSlice;
export const { reducer: orderProductListReducer } = orderProductListSlice;
