import { createSlice } from "@reduxjs/toolkit";
import { fetchNomenclaturesWhiteList } from "../services/fetchNomenclaturesWhiteList";
import { NomenclaturesWhiteListSchema } from "../types/nomenclaturesWhiteList";

const initialState: NomenclaturesWhiteListSchema = {
  isLoading: false,
};

const nomenclaturesWhiteListSlice = createSlice({
  name: "nomenclatures/WhiteList",
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(fetchNomenclaturesWhiteList.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchNomenclaturesWhiteList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(fetchNomenclaturesWhiteList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: nomenclaturesWhiteListActions } = nomenclaturesWhiteListSlice;
export const { reducer: nomenclaturesWhiteListReducer } = nomenclaturesWhiteListSlice;
