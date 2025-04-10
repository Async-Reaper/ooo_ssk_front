import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddToSellerDataSchema } from "../types/addToSellerData";
import { fetchAddToSellerData } from "../services/fetchAddToSellerData";
import { ISellerOrder } from "../../../../entities/SellerOrders";

const initialState: AddToSellerDataSchema = {
  isLoading: false,
};

const addToSellerDataSlice = createSlice({
  name: "sellerData/add",
  initialState,
  reducers: {
    addToSellerData(state, action: PayloadAction<ISellerOrder>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchAddToSellerData.pending, (state) => {
      state.isLoading = true;
      state.textResponse = "";
    })
    .addCase(fetchAddToSellerData.fulfilled, (state) => {
      state.isLoading = false;
      state.textResponse = "";
    })
    .addCase(fetchAddToSellerData.rejected, (state) => {
      state.isLoading = false;
    }),
});

export const { actions: addToSellerDataActions } = addToSellerDataSlice;
export const { reducer: addToSellerDataReducer } = addToSellerDataSlice;
