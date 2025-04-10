import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StateSumBasket } from "../types/sum";

const initialState: StateSumBasket = {
  sumBasket: undefined,
};

const selectSumBasketSlice = createSlice({
  name: "selectSumBasket/basket",
  initialState,
  reducers: {
    setSumBasket(state, action:PayloadAction<number>) {
      state.sumBasket = action.payload;
    },
  },
});

export const { actions: selectSumBasketActions } = selectSumBasketSlice;
export const { reducer: selectSumBasketReducer } = selectSumBasketSlice;
