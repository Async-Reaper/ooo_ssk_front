import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BrandsListSchema, IBrandsListResponse } from "./brandsList";
import { fetchBrandsList } from "./brandsListService";

const initialState : BrandsListSchema = {
  isLoading: false,
};

const brandsListSlice = createSlice({
  name: "brand",
  initialState, 
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(fetchBrandsList.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchBrandsList.fulfilled, (state, action: PayloadAction<IBrandsListResponse>) => {
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(fetchBrandsList.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = true;
      state.error = action.payload;
    }),
});

export const { reducer: brandsListReducer } = brandsListSlice;
