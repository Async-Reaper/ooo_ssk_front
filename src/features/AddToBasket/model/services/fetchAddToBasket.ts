import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { AddToBasketData, BasketInfo } from "@features/AddToBasket";

export const fetchAddToBasket = createAsyncThunk<BasketInfo, AddToBasketData, ThunkConfig<any>>(
  "basket/add",
  async (data, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.post<BasketInfo>("/api/basket/add_new_position", data);
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
