import { StateSchema } from "@app/providers/StoreProvider";

export const getDebtsData = (state: StateSchema) => state.debts?.data;
export const getDebtsIsLoading = (state: StateSchema) => state.debts?.isLoading;
export const getDebtsErrors = (state: StateSchema) => state.debts?.errors;
