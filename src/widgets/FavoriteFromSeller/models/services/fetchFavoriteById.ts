import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { IFavorite } from "../types/favorite";

export const fetchFavoriteById = createAsyncThunk<IFavorite[], string, ThunkConfig<any>>(
  "favorite/ByRid",
  async (guid, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.get(`/api/get_favorites_by_representativeGuid/${guid}`);
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
