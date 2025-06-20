import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product, GetSellerDataSchema, IGetSellerData } from "../types/getSellerData";
import { fetchGetSellerData } from "../services/fetchGetSellerData";

const initialState: GetSellerDataSchema = {
  isLoading: false,
};

const getSellerDataSlice = createSlice({
  name: "sellerData/get",
  initialState,
  reducers: {
    setApproved(state, action: PayloadAction<boolean>) {
      if (state.data && state.data.document_data.document_header) {
        state.data.document_data.document_header.approved = action.payload;
      }
    },
    freshView(state, action: PayloadAction<Product[]>) {
      if (state.data) {
        state.data.document_data.products = action.payload;
      }
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
