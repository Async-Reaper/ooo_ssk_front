import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { IDeleteFromFavorite } from "../types/deleteFromFavorite";

export const fetchDeleteFromFavorite = createAsyncThunk<any, IDeleteFromFavorite, ThunkConfig<any>>(
  "favorite/delete",
  async (data, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.delete<any>("/api/deleted_favotite_by_guid", {
        data: {
          user_guid: data.userGuid,
          product_guid: data.productGuid,
          currentTradePoint: data.currentTradePoint,
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
