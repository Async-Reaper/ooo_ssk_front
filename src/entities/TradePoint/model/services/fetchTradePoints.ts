import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { ITradePoint } from "../types/tradePointTypes";

export const fetchTradePoints = createAsyncThunk<ITradePoint[], string, ThunkConfig<any>>(
  "tradePoints/all",
  async (userGuid, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.get<ITradePoint[]>(`/api/contract/get_contract/${userGuid}`);
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
