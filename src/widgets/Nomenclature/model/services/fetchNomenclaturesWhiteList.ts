import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { INomenclaturesWhiteList } from "../types/nomenclaturesWhiteList";

export interface fetchNomenclaturesWhiteListParams {
  nomenclatures: string[];
}

export const fetchNomenclaturesWhiteList = createAsyncThunk<INomenclaturesWhiteList[], fetchNomenclaturesWhiteListParams, ThunkConfig<any>>(
  "nomenclatures/WhiteList",
  async (data, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.post<INomenclaturesWhiteList[]>("/api/nomenclature/get_nomenclatures", data);
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
