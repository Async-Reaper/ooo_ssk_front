import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@app/providers/StoreProvider";
import axios from "axios";
import { NomeclatureGroupListType } from "../types/nomenclatureGroup";

export const fetchNomenclatureGroup = createAsyncThunk<NomeclatureGroupListType[], void, ThunkConfig<string>>(
  "nomenclaturesGroup/all",
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.get("/api/group/get_group");
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
