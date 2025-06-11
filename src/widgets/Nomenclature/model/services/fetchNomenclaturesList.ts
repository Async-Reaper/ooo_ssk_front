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
          matrix: filter.matrixGUID,
        },
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();
          Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              value.forEach((v) => searchParams.append(key, v));
            } else if (value !== undefined && value !== null && value !== "") {
              searchParams.append(key, value);
            }
          });
          return searchParams.toString();
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
