import { StateSchema } from "@app/providers/StoreProvider";

export const getApprovedOrderIsLoading = (state: StateSchema) => state.approvedOrderForm?.isLoading;
export const getApprovedOrderError = (state: StateSchema) => state.approvedOrderForm?.error;
export const getApprovedOrderMessage = (state: StateSchema) => state.approvedOrderForm?.message;
