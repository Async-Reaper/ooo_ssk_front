import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { ISumBasket, OsumBasket } from "../types/sum";

export const fetchSumBasketByParams = createAsyncThunk<ISumBasket, OsumBasket, ThunkConfig<any>>(
  "basket/sum",
  async (params, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.get(`/api/basket/get_info_basket/${params.userGuid}/${params.contractGuid}`);
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
