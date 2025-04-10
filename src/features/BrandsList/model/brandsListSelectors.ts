import { StateSchema } from "@app/providers/StoreProvider";

export const getBrandsListData = (state : StateSchema) => state.brandsList?.data?.brands;
export const getBrandsTotalCount = (state: StateSchema) => state.brandsList?.data?.total_count_brands;
export const getBrandsListError = (state : StateSchema) => state.brandsList?.error;
export const getBrandsListisLoading = (state : StateSchema) => state.brandsList?.isLoading;
