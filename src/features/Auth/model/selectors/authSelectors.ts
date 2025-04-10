import { StateSchema } from "@app/providers/StoreProvider";

export const getAuthIsLoading = (state: StateSchema) => state.authForm?.isLoading;
export const getAuthErrors = (state: StateSchema) => state.authForm?.error;
