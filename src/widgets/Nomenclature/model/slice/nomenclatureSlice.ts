import { createSlice } from "@reduxjs/toolkit";
import { NomenclatureSchema } from "../types/nomenclature";
import { fetchNomenclatureById } from "../services/fetchNomenclatureById";

const initialState: NomenclatureSchema = {
  isLoading: false,
};

const nomenclatureSlice = createSlice({
  name: "nomenclature/id",
  initialState,
  reducers: {
    setNomenclature(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchNomenclatureById.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchNomenclatureById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.list = state.list
        ? [...state.list]
        : [];
      const index = state.list.findIndex((element) => element.guid === action.payload.guid);
      if (index !== -1) {
        state.list[index] = action.payload;
      } else {
        state.list.push(action.payload);
      }
    })
    .addCase(fetchNomenclatureById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: nomenclatureActions } = nomenclatureSlice;
export const { reducer: nomenclatureReducer } = nomenclatureSlice;
