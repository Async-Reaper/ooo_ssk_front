import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addToFavoriteActions } from "../../../../features/AddToFavorite";
import { deleteFromFavoriteActions } from "../../../../features/DeleteFromFavorite";
import { fetchFavoriteProduct } from "../services/fetchFavoriteProduct";
import { FavoriteSchema } from "../types/favorite";

const initialState: FavoriteSchema = {
  isLoading: false,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    deleteFromFavorite(state, action: PayloadAction<string>) {
      state.data = state.data?.filter((favorite) => favorite.product_guid !== action.payload);
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchFavoriteProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchFavoriteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(fetchFavoriteProduct.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(deleteFromFavoriteActions.deleteFromFavorite, (state, action: PayloadAction<string>) => {
      state.data = state.data?.filter((favorite) => favorite.product_guid !== action.payload);
    })
    .addCase(addToFavoriteActions.addToFavorite, (state, action: PayloadAction<any>) => {
      state.data?.push(action.payload);
    }),
});

export const { actions: favoriteActions } = favoriteSlice;
export const { reducer: favoriteReducer } = favoriteSlice;
