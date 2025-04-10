import { StateSchema } from "@app/providers/StoreProvider";

export const getCreateOrderIsLoading = (state: StateSchema) => state.createOrderForm?.isLoading;
export const getCreateOrderError = (state: StateSchema) => state.createOrderForm?.error;
export const getCreateOrderMessage = (state: StateSchema) => state.createOrderForm?.message;
