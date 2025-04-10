import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDeleteFromBasket } from "../services/fetchDeleteFromBasket";
import { DeleteFromBasketSchema } from "../types/deleteFromBasket";

const initialState: DeleteFromBasketSchema = {
  isLoading: false,
};

const deleteFromBasketSlice = createSlice({
  name: "basket/delete",
  initialState,
  reducers: {
    deleteFromBasket(state, action: PayloadAction<string>) {
      state.productGuid = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchDeleteFromBasket.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchDeleteFromBasket.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchDeleteFromBasket.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    }),
});

export const { actions: deleteFromBasketActions } = deleteFromBasketSlice;
export const { reducer: deleteFromBasketReducer } = deleteFromBasketSlice;
