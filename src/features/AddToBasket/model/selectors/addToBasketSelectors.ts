import { StateSchema } from "@app/providers/StoreProvider";

export const getAddToBasketInfo = (state: StateSchema) => state.addToBasketForm?.basketInfo;
export const getAddToBasketIsLoading = (state: StateSchema) => state.addToBasketForm?.isLoading;
export const getAddToBasketTextResponse = (state: StateSchema) => state.addToBasketForm?.textResponse;
export const getAddToBasketErrors = (state: StateSchema) => state.addToBasketForm?.errors;
