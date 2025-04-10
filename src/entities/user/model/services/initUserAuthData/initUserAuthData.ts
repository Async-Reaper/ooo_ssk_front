import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserDataType } from "@entities/user";
import { ThunkConfig } from "@app/providers/StoreProvider";
import axios from "axios";
import { getCookie } from "@shared/libs/cookie";

export const initUserAuthData = createAsyncThunk<UserDataType, void, ThunkConfig<string>>(
  "user/initUserAuthData",
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.get<UserDataType>("/api/service/user/authorization", {
        headers: {
          Access_token: getCookie("access_token"),
        },
      });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (!e.response) {
          rejectWithValue("NO CONNECTION");
        }
      }
      return rejectWithValue("error");
    }
  },
);
