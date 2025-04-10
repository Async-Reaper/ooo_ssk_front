import { StateSchema } from "@app/providers/StoreProvider";

export const getOrdersHistoryProductsData = (state: StateSchema) => state.orderProductHistoryList?.data?.products;
export const getOrdersHistoryProductsIsLoading = (state: StateSchema) => state.orderProductHistoryList?.isLoading;
export const getOrdersHistoryProductsError = (state: StateSchema) => state.orderProductHistoryList?.error;
