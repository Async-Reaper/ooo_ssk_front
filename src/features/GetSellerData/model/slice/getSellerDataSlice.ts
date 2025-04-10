import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchGetSellerData } from "../services/fetchGetSellerData";
import { GetSellerDataSchema, IGetSellerData } from "../types/getSellerData";

const initialState: GetSellerDataSchema = {
  isLoading: false,
};

const getSellerDataSlice = createSlice({
  name: "sellerData/get",
  initialState,
  reducers: {
    freshView(state, action: PayloadAction<IGetSellerData>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchGetSellerData.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchGetSellerData.fulfilled, (state, action: PayloadAction<IGetSellerData>) => {
      state.isLoading = false;
      state.data = action.payload;
    })
    .addCase(fetchGetSellerData.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.errors = action.payload;
    }),
});

export const { actions: getSellerDataActions } = getSellerDataSlice;
export const { reducer: getSellerDataReducer } = getSellerDataSlice;
