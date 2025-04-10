import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddToBasketData, AddToBasketSchema } from "../types/addToBasket";
import { fetchAddToBasket } from "../services/fetchAddToBasket";

const initialState: AddToBasketSchema = {
  isLoading: false,
};

const addToBasketSlice = createSlice({
  name: "basket/add",
  initialState,
  reducers: {
    addToBasket(state, action: PayloadAction<AddToBasketData>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchAddToBasket.pending, (state) => {
      state.isLoading = true;
      state.textResponse = "";
    })
    .addCase(fetchAddToBasket.fulfilled, (state) => {
      state.isLoading = false;
      state.textResponse = "Товар добавлен в корзину";
    })
    .addCase(fetchAddToBasket.rejected, (state) => {
      state.isLoading = false;
    }),
});

export const { actions: addToBasketActions } = addToBasketSlice;
export const { reducer: addToBasketReducer } = addToBasketSlice;
