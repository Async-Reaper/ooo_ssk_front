import { StateSchema } from "@app/providers/StoreProvider";

export const getHistoryOrderProductData = (state: StateSchema) => state.historyOrderProduct?.data;
export const getHistoryOrderProductMessage = (state: StateSchema) => state.historyOrderProduct?.textMessage;
export const getHistoryOrderProductIsLoading = (state: StateSchema) => state.historyOrderProduct?.isLoading;
export const getHistoryOrderProductError = (state: StateSchema) => state.historyOrderProduct?.error;
