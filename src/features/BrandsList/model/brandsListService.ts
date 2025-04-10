import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { IBrandsListResponse } from "./brandsList";

export const fetchBrandsList = createAsyncThunk<IBrandsListResponse, void, ThunkConfig<any>>(
  "brandsList",
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.get("/api/brand/get_all_brands");
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
