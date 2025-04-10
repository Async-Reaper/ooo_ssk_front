import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HistoryOrderProductSchema } from "../types/historyOrderProduct";
import { fetchHistoryOrderProduct } from "../services/fetchHistoryOrderProduct";

const initialState: HistoryOrderProductSchema = {
  isLoading: false,
};

const historyOrderProductSlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(fetchHistoryOrderProduct.pending, (state) => {
      state.isLoading = true;
      state.textMessage = "Загружаем";
    })
    .addCase(fetchHistoryOrderProduct.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.data = action.payload;
      state.textMessage = !state.data?.arrayOfOrders?.length
        ? "Данный товар еще ни разу не был заказан"
        : "";
    })
    .addCase(fetchHistoryOrderProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.textMessage = "Не удалось загрузить заказы";
    }),
});

export const { reducer: historyOrderProductReducer } = historyOrderProductSlice;
