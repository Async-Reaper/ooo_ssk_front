import { createSlice } from "@reduxjs/toolkit";
import { deleteFromBasketActions } from "@features/DeleteFromBasket";
import { BasketSchema } from "../types/basket";

import { fetchBasketProductWithContract } from "../services/fetchBasketProductWithContract";
import { addToBasketActions } from "../../../../features/AddToBasket";

const initialState: BasketSchema = {
  count: 0,
  orderSum: 0,
  isLoading: false,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
   
    .addCase(fetchBasketProductWithContract.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchBasketProductWithContract.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderSum = action.payload.order_sum;
      state.products = action.payload.products;
    })
    .addCase(fetchBasketProductWithContract.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(addToBasketActions.addToBasket, (state, action) => {
      if (!state.products) {
        return;
      }
       
      const existingProductIndex = state.products.findIndex(
        (product) => product.product_guid === action.payload.product_guid,
      );
       
      if (existingProductIndex !== -1) {
        state.products[existingProductIndex].count = action.payload.count;
      }
    })
    .addCase(deleteFromBasketActions.deleteFromBasket, (state, action) => {
      state.products = state?.products?.filter((basketItem) => basketItem.product_guid !== action.payload);
    }),
});

export const { actions: basketActions } = basketSlice;
export const { reducer: basketReducer } = basketSlice;
