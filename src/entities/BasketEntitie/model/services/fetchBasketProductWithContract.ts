import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { IBasketData } from "../types/basket";

interface BasketProductWithContract {
  userGuid: string;
  contractGuid: string | null;
}

export const fetchBasketProductWithContract = createAsyncThunk<IBasketData, BasketProductWithContract, ThunkConfig<any>>(
  "basket/withContract",
  // @ts-ignore
  async (params, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.get<IBasketData>(`/api/basket/get_all_product_user_by_contract_guid/${params.userGuid}/${params.contractGuid}`);
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
