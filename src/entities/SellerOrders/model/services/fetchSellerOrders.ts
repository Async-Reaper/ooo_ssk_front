import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { ISellerOrder } from "../types/sellerOrdersTypes";

export const fetchSellerData = createAsyncThunk<ISellerOrder[], string, ThunkConfig<any>>(
  "seller/orders",
  async (sellerGUID, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.get<ISellerOrder[]>(
        `/api/representative_data/get_all_representative_data/${sellerGUID}`,
      );
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
