import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { INomenclature } from "../types/nomenclature";

interface nomenclatureDateParams {
  productGUID: string;
  contractGUID?: string;
}

export const fetchNomenclatureById = createAsyncThunk<INomenclature, nomenclatureDateParams, ThunkConfig<any>>(
  "nomenclatures/ById",
  async (params, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.get(`/api/nomenclature/get_product/${params.productGUID}?contract_guid=${params.contractGUID}`);
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
