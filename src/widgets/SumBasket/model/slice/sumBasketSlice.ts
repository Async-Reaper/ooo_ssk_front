import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchSumBasketByParams,
} from "../services/fetchSumBasket";
import { ISumBasket, SumBasketShema } from "../types/sum";

const initialState: SumBasketShema = {
  isLoading: false,
};

const sumBasketSlice = createSlice({
  name: "basket/sum",
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(fetchSumBasketByParams.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchSumBasketByParams.fulfilled, (state, action: PayloadAction<ISumBasket>) => {
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(fetchSumBasketByParams.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: sumBasketActions } = sumBasketSlice;
export const { reducer: sumBasketReducer } = sumBasketSlice;
