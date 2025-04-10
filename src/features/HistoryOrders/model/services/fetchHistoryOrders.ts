import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "@shared/libs/cookie";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { IHistoryOrders, IHistoryOrdersRequest } from "@features/HistoryOrders";

export const fetchHistoryOrders = createAsyncThunk<IHistoryOrders[], IHistoryOrdersRequest, ThunkConfig<any>>(
  "history/orders",
  async (data, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.get<IHistoryOrders[]>(`/api/dao/get_history_product/${data.startDate}/${data.endDate}/${data.contractGUID}`, {
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
