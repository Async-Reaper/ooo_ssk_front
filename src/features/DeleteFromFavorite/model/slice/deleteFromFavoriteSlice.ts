import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDeleteFromFavorite } from "../services/fetchDeleteFromFavorite";
import { DeleteFromFavoriteSchema } from "../types/deleteFromFavorite";

const initialState: DeleteFromFavoriteSchema = {
  isLoading: false,
};

const deleteFromFavoriteSlice = createSlice({
  name: "favorite/delete",
  initialState,
  reducers: {
    deleteFromFavorite(state, action: PayloadAction<string>) {
      state.productGuid = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchDeleteFromFavorite.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchDeleteFromFavorite.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchDeleteFromFavorite.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    }),
});

export const { actions: deleteFromFavoriteActions } = deleteFromFavoriteSlice;
export const { reducer: deleteFromFavoriteReducer } = deleteFromFavoriteSlice;
