import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";

interface ParamsDeleteSellerData {
  document_guid : string;
  user_guid : string;
}

export const fetchDeleteFromSellerData = createAsyncThunk<any, ParamsDeleteSellerData, ThunkConfig<any>>(
  "sellerData/delete",
  async (params, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.delete(`/api/representative_data/delete_representative_data/${params.user_guid}/${params.document_guid}`);
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
