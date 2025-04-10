import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "../../../../app/providers/StoreProvider";
import { IDebtsData } from "../types/debts";

export const fetchDebts = createAsyncThunk<IDebtsData, string, ThunkConfig<any>>(
  "user/debts",
  async (params, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.get<IDebtsData>(
        `/api/daoget_receive_accounts_receivable/${params}`,
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
