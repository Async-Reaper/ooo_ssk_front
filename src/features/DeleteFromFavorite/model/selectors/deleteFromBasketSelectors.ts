import { StateSchema } from "@app/providers/StoreProvider";

export const getDeleteFromBasketIsLoading = (state: StateSchema) => state.deleteFromBasketForm?.isLoading;
export const getDeleteFromBasketErrors = (state: StateSchema) => state.deleteFromBasketForm?.errors;
