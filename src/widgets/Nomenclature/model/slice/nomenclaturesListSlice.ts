import { createSlice } from "@reduxjs/toolkit";
import { NomenclaturesListSchema } from "../types/nomenclaturesList";
import { fetchNomenclaturesList } from "../services/fetchNomenclaturesList";

const initialState: NomenclaturesListSchema = {
  isLoading: false,
};

const nomenclaturesListSlice = createSlice({
  name: "nomenclatures",
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(fetchNomenclaturesList.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchNomenclaturesList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
      state.total_count_products = action.payload.count_products;
    })
    .addCase(fetchNomenclaturesList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: nomenclaturesListActions } = nomenclaturesListSlice;
export const { reducer: nomenclaturesListReducer } = nomenclaturesListSlice;
