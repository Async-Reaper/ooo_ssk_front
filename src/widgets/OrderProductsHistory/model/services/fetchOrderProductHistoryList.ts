import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "@shared/libs/cookie";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { IOrderProductsHistoryList } from "../types/orderProductsHistoryList";

export const fetchOrderProductHistoryList = createAsyncThunk<IOrderProductsHistoryList, string, ThunkConfig<any>>(
  "history/orderId",
  async (orderId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.get<IOrderProductsHistoryList>(`/api/dao/get_orders_table/${orderId}`, {
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
