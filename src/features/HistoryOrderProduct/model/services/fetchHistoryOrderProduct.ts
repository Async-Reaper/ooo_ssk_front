import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "@shared/libs/cookie";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { IHistoryOrderProduct } from "../types/historyOrderProduct";

export const fetchHistoryOrderProduct = createAsyncThunk<IHistoryOrderProduct[], IHistoryOrderProduct, ThunkConfig<any>>(
  "history/product",
  async (data, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.get<IHistoryOrderProduct[]>(`/api/dao/get_history_product/${data.productItem}/${data.contractGUID}`, {
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
