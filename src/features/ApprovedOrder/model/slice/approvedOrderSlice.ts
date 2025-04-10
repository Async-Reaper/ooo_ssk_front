import { createSlice } from "@reduxjs/toolkit";
import { ApprovedOrderSchema } from "../types/approvedOrder";
import { fetchApprovedOrder } from "../services/fetchApprovedOrder";

const initialState: ApprovedOrderSchema = {
  isLoading: false,
};

const approvedOrderSlice = createSlice({
  name: "approvedOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(fetchApprovedOrder.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchApprovedOrder.fulfilled, (state) => {
      state.isLoading = false;
      state.message = "Заказ утвержден";
    })
    .addCase(fetchApprovedOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.message = "При утверждении заказа произошла ошибка";
      state.error = action.payload;
    }),
});

export const { actions: approvedOrderActions } = approvedOrderSlice;
export const { reducer: approvedOrderReducer } = approvedOrderSlice;
