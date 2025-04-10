import { createSlice } from "@reduxjs/toolkit";
import { FavoriteSchem } from "../types/favorite";
import { fetchFavoriteById } from "../services/fetchFavoriteById";

const initialState: FavoriteSchem = {
  isLoading: false,
};

const favoriteSlice = createSlice({
  name: "favoriteFromSeller/get",
  initialState,
  reducers: {
    setFavorite(state, action) {
      state.data = action.payload;
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

export const { actions: favoriteActions } = favoriteSlice;
export const { reducer: favoriteReducer } = favoriteSlice;
