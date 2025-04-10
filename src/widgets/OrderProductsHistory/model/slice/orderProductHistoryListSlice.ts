import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchOrderProductHistoryList,
} from "../services/fetchOrderProductHistoryList";
import { IOrderProductsHistoryList, OrderProductsHistoryListSchema } from "../types/orderProductsHistoryList";

const initialState: OrderProductsHistoryListSchema = {
  isLoading: false,
};

const orderProductHistoryListSlice = createSlice({
  name: "history/id",
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(fetchOrderProductHistoryList.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchOrderProductHistoryList.fulfilled, (state, action: PayloadAction<IOrderProductsHistoryList>) => {
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(fetchOrderProductHistoryList.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: orderProductHistoryListActions } = orderProductHistoryListSlice;
export const { reducer: orderProductHistoryListReducer } = orderProductHistoryListSlice;
