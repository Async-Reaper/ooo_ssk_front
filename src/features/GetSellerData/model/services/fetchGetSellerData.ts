import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "../../../../app/providers/StoreProvider";
import { IGetSellerData } from "../types/getSellerData";

interface GetSellerData {
  user_guid : string;
  document_guid: string;
}

export const fetchGetSellerData = createAsyncThunk<IGetSellerData, GetSellerData, ThunkConfig<any>>(
  "sellerData/get",
  async (params, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.get<IGetSellerData>(
        `/api/representative_data/get_representative_data/${params.user_guid}/${params.document_guid}`,
      );
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
