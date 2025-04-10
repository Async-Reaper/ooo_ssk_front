import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITradePoint, TradePointSchema } from "../types/tradePointTypes";
import { fetchTradePoints } from "../services/fetchTradePoints";

const initialState: TradePointSchema = {
  isLoading: false,
};

const tradePointSlice = createSlice({
  name: "tradePoint",
  initialState,
  reducers: {
    changeTradePoint(state, action: PayloadAction<ITradePoint>) {
      state.currentPoint = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchTradePoints.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchTradePoints.fulfilled, (state, action: PayloadAction<ITradePoint[]>) => {
      state.isLoading = false;
      state.data = action.payload;
      state.errors = undefined;
    })
    .addCase(fetchTradePoints.rejected, (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    }),
});

export const { actions: tradePointActions } = tradePointSlice;
export const { reducer: tradePointReducer } = tradePointSlice;
