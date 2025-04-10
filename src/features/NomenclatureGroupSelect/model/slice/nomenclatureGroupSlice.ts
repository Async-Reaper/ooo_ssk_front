import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNomenclatureGroup } from "../services/fetchNomenclatureGroup";
import { NomenclatureGroupSchema } from "../types/nomenclatureGroup";

const initialState: NomenclatureGroupSchema = {
  isLoading: false,
};

const nomenclatureGroupSlice = createSlice({
  name: "nomenclatureGroup",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => builder
    .addCase(fetchNomenclatureGroup.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchNomenclatureGroup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(fetchNomenclatureGroup.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.errors = action.payload;
    }),
});

export const { actions: nomenclatureGroupActions } = nomenclatureGroupSlice;
export const { reducer: nomenclatureGroupReducer } = nomenclatureGroupSlice;
