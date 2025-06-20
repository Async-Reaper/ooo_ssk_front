import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { IDeleteFromFavorite } from "../types/deleteFromFavorite";

export const fetchDeleteFromFavoriteSeller = createAsyncThunk<any, IDeleteFromFavorite, ThunkConfig<any>>(
  "favorite/deleteSeller",
  async (data, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.delete<any>("/api/deleted_favorite_seller_by_guid", {
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
