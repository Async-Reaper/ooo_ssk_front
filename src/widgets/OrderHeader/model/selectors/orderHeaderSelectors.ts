import { StateSchema } from "@app/providers/StoreProvider";

export const getOrderHeaderData = (state: StateSchema) => state.orderHeader?.data;
export const getOrdersHeaderIsLoading = (state: StateSchema) => state.orderHeader?.isLoading;
export const getOrdersHeaderError = (state: StateSchema) => state.orderHeader?.error;
