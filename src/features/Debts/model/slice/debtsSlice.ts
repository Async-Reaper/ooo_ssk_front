import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchDebts } from "../services/fetchDebts";
import { DebtsSchema, IDebtsData } from "../types/debts";

const initialState: DebtsSchema = {
  isLoading: false,
};

const debtsSlice = createSlice({
  name: "user/debts",
  initialState,
  reducers: {
    freshView(state, action: PayloadAction<IDebtsData>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchDebts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchDebts.fulfilled, (state, action: PayloadAction<IDebtsData>) => {
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(fetchDebts.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.errors = action.payload;
    }),
});

export const { actions: debtsActions } = debtsSlice;
export const { reducer: debtsReducer } = debtsSlice;
