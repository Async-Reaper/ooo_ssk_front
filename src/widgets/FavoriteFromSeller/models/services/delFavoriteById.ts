import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { IFavorite } from "../types/favorite";

export const delFavoriteById = createAsyncThunk<any, IFavorite, ThunkConfig<any>>(
  "delfavorite/ByRid",
  async (guid, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.post(`/api/deleted_favotite_by_guid/${guid}`);
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
