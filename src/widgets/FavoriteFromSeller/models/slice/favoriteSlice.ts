import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoriteSellerSchema } from "../types/favorite";
import { fetchFavoriteById } from "../services/fetchFavoriteById";

const initialState: FavoriteSellerSchema = {
  isLoading: false,
};

const favoriteSlice = createSlice({
  name: "favoriteFromSeller/get",
  initialState,
  reducers: {
    setFavorite(state, action) {
      state.data = action.payload;
    },
    deleteFavoriteById(state, action: PayloadAction<string>) {
      state.data = state.data?.map((favorite) => ({
        ...favorite,
        products: favorite.products.filter((product) => product.product_guid !== action.payload),
      }));
    },
    deleteFavoriteAll(state, action: PayloadAction<string>) {
      state.data = state.data?.filter((favorite) => favorite.user_name !== action.payload);
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchFavoriteById.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchFavoriteById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(fetchFavoriteById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: favoriteSellerActions } = favoriteSlice;
export const { reducer: favoriteSellerReducer } = favoriteSlice;
