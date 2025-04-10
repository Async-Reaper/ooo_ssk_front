import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "@shared/libs/cookie";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { IOrderHeader } from "../types/orderHeader";

export const fetchOrderHeader = createAsyncThunk<IOrderHeader, string, ThunkConfig<any>>(
  "order/header/id",
  async (orderId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.get<IOrderHeader>(`/api/dao/get_orders_headers/${orderId}`, {
        headers: {
          access_token: getCookie("access_token"),
        },
      });
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
