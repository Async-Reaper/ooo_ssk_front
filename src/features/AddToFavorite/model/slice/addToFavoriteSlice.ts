import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFavorite } from "@entities/FavoriteProducts";
import { AddToFavoriteSchema } from "../types/addToFavorite";
import { fetchAddToFavorite } from "../services/fetchAddToFavorite";

const initialState: AddToFavoriteSchema = {
  textResponse: "",
  isLoading: false,
};

const addToFavoriteSlice = createSlice({
  name: "favorite/add",
  initialState,
  reducers: {
    addToFavorite(state, action: PayloadAction<IFavorite>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchAddToFavorite.pending, (state) => {
      state.isLoading = true;
      state.textResponse = "";
    })
    .addCase(fetchAddToFavorite.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchAddToFavorite.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    }),
});

export const { actions: addToFavoriteActions } = addToFavoriteSlice;
export const { reducer: addToFavoriteReducer } = addToFavoriteSlice;
