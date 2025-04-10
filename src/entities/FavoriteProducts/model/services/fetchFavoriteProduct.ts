import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { IFavorite, SendData } from "../types/favorite";

export const fetchFavoriteProduct = createAsyncThunk<IFavorite[], SendData, ThunkConfig<any>>(
  "favorite/all",
  async (sendData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.get<IFavorite[]>(`/api/get_favorites/${sendData.userGuid}/${sendData.contractGuid}`);
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
