import { createSlice } from "@reduxjs/toolkit";
import { CreateOrderSchema } from "../types/createOrder";
import { fetchCreateOrder } from "../services/fetchCreateOrder";

const initialState: CreateOrderSchema = {
  isLoading: false,
};

const createOrderSlice = createSlice({
  name: "createOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(fetchCreateOrder.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchCreateOrder.fulfilled, (state) => {
      state.isLoading = false;
      state.message = "Заказ успешно оформлен";
    })
    .addCase(fetchCreateOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.message = "При оформлении заказа произошла ошибка";
      state.error = action.payload;
    }),
});

export const { actions: createOrderActions } = createOrderSlice;
export const { reducer: createOrderReducer } = createOrderSlice;
