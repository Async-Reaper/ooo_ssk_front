import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { getCookie } from "@shared/libs/cookie";
import { ICreateOrder } from "../types/createOrder";

export const fetchCreateOrder = createAsyncThunk<any, ICreateOrder, ThunkConfig<any>>(
  "order/create",
  async (data, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.post("/api/dao/create_order", data, {
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
