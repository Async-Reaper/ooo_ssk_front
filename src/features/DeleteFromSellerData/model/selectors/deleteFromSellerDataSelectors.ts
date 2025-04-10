import { StateSchema } from "@app/providers/StoreProvider";

export const getDeleteFromSellerData = (state: StateSchema) => state.deleteFromSellerData?.data;
export const getDeleteFromSellerDataIsLoading = (state: StateSchema) => state.deleteFromSellerData?.isLoading;
export const getDeleteFromSellerDataErrors = (state: StateSchema) => state.deleteFromSellerData?.errors;
