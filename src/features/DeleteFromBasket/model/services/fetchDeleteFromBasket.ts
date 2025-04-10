import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { IDeleteFromBasket } from "../types/deleteFromBasket";

export const fetchDeleteFromBasket = createAsyncThunk<any, IDeleteFromBasket, ThunkConfig<any>>(
  "basket/delete",
  async (params, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.delete(`/api/basket/deleted_product_from_basket/${params.userGuid}/${params.contractGuid}/${params.productGuid}`);
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
