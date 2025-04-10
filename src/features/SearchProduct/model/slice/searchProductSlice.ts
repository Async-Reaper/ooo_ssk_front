import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchProductSchema } from "../../../SearchProduct";

const initialState: SearchProductSchema = {
  value: "",
};

const searchProductSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { actions: searchProductActions } = searchProductSlice;
export const { reducer: searchProductReducer } = searchProductSlice;
