import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { userActions } from "@entities/user";

export const logoutUser = createAsyncThunk<any, void, ThunkConfig<any>>(
  "user/logout",
  async (_, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;
    try {
      const response = await extra.api.delete("/api/service/user/logout");
      dispatch(userActions.logout());
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
