import { StateSchema } from "@app/providers/StoreProvider";

export const getSellerData = (state: StateSchema) => state.getSellerData?.data;
export const getSellerDataIsLoading = (state: StateSchema) => state.getSellerData?.isLoading;
export const getSellerDataErrors = (state: StateSchema) => state.getSellerData?.errors;
