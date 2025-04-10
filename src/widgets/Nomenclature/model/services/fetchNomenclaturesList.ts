import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "@shared/libs/cookie";
import { ThunkConfig } from "@app/providers/StoreProvider";
import { NomenclatureListData } from "../types/nomenclaturesList";

export const fetchNomenclaturesList = createAsyncThunk<NomenclatureListData, IFilterNomenclatures, ThunkConfig<any>>(
  "nomenclatures/all",
  async (filter, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.get<NomenclatureListData>(`/api/nomenclature/get_product_by_options/${filter.page}/${filter.limit}`, {
        params: {
          brand_guid: filter.brandGuid,
          nomenclature_group: filter.parentGuid,
          is_new: filter.isNew,
          is_discount: filter.isDiscount,
          contract_guid: filter.contractGuid,
          title_products: filter.titleProduct,
        },
        headers: {
          access_token: getCookie("access_token"),
        },
      });
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
