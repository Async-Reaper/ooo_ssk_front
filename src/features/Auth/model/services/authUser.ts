import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { AuthTypes } from "../types/authTypes";

export const authUser = createAsyncThunk<any, AuthTypes, ThunkConfig<any>>(
  "user/auth",
  async (data, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.post("/api/service/user/authentication", data);
      localStorage.setItem("matrix", JSON.stringify(response.data.matrix));
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (!e.response) {
          return rejectWithValue("NO_CONNECTION");
        }
        return rejectWithValue(e?.response!.data);
      }
         
      return rejectWithValue("error");
    }
  },
);
