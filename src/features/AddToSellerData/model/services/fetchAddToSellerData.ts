import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { ISellerOrder } from "@entities/SellerOrders";

export const fetchAddToSellerData = createAsyncThunk<ISellerOrder, ISellerOrder, ThunkConfig<any>>(
  "sellerData/add",
  async (data, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.post("/api/representative_data/create_representative_data", data);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (!e.response) {
          return rejectWithValue("NO_CONNECTION");
        }
      }
      return rejectWithValue("error");
    }
  },
);
