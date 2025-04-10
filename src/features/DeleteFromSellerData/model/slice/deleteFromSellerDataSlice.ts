import { createSlice } from "@reduxjs/toolkit";
import { fetchDeleteFromSellerData } from "../services/fetchDeleteFromSellerData";
import { DeleteFromSellerDataSchema } from "../types/deleteFromSellerData";

const initialState: DeleteFromSellerDataSchema = {
  isLoading: false,
};

const deleteFromSellerDataSlice = createSlice({
  name: "sellerData/delete",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => builder
    .addCase(fetchDeleteFromSellerData.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchDeleteFromSellerData.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchDeleteFromSellerData.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    }),
});

export const { actions: deleteFromSellerDataActions } = deleteFromSellerDataSlice;
export const { reducer: deleteFromSellerDataReducer } = deleteFromSellerDataSlice;
