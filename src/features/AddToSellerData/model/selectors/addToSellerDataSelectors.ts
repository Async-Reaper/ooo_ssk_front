import { StateSchema } from "@app/providers/StoreProvider";

export const getAddToSellerData = (state: StateSchema) => state.addToSellerData?.data;
export const getAddToSellerDataIsLoading = (state: StateSchema) => state.addToSellerData?.isLoading;
export const getAddToSellerDataErrors = (state: StateSchema) => state.addToSellerData?.errors;
