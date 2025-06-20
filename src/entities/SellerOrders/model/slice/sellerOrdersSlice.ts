import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAddToSellerData } from "@features/AddToSellerData";
import { fetchDeleteFromSellerData } from "@features/DeleteFromSellerData";
import { ISellerOrder, SellerOrderSchema } from "../types/sellerOrdersTypes";
import { fetchSellerData } from "../services/fetchSellerOrders";

const initialState: SellerOrderSchema = {
  isLoading: false,
};

const sellerDataSlice = createSlice({
  name: "sellerData",
  initialState,
  reducers: {
    changeSellerData(state, action: PayloadAction<ISellerOrder | undefined>) {
      state.currentOrder = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchSellerData.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchSellerData.fulfilled, (state, action: PayloadAction<ISellerOrder[]>) => {
      state.isLoading = false;
      state.data = action.payload;
      // state.data = action.payload.map(result => [...new Set(result.document_data)]);
      state.errors = undefined;
    })
    .addCase(fetchSellerData.rejected, (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchAddToSellerData.fulfilled, (state, action: PayloadAction<ISellerOrder>) => {
      state.currentOrder = action.payload;
      state.data = state.data?.map((order) => { if (order.document_guid === action.payload.document_guid) { return action.payload; } return order; });
    })
    .addCase(fetchDeleteFromSellerData.fulfilled, (state, action: PayloadAction<ISellerOrder>) => {
      state.data = state.data?.filter((order) => order.document_guid !== state.currentOrder?.document_guid);
      state.currentOrder = action.payload;
    }),
});

export const { actions: sellerDataActions } = sellerDataSlice;
export const { reducer: sellerDataReducer } = sellerDataSlice;
