import { createSlice } from "@reduxjs/toolkit";
import { HistoryOrdersListSchema } from "@features/HistoryOrders";
import { fetchHistoryOrders } from "../services/fetchHistoryOrders";

const initialState: HistoryOrdersListSchema = {
  isLoading: false,
};

const historyOrdersSlice = createSlice({
  name: "history/withDate",
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(fetchHistoryOrders.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchHistoryOrders.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchHistoryOrders.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }),
});

export const { actions: historyOrdersActions } = historyOrdersSlice;
export const { reducer: historyOrdersReducer } = historyOrdersSlice;
