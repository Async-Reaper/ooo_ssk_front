import { StateSchema } from "@app/providers/StoreProvider";

export const getBasketData = (state: StateSchema) => state.basketList?.products;
export const getBasketOrderSum = (state: StateSchema) => state.basketList?.orderSum;
export const getBasketCount = (state: StateSchema) => state.basketList?.count;
export const getBasketIsLoading = (state: StateSchema) => state.basketList?.isLoading;
export const getBasketErrors = (state: StateSchema) => state.basketList?.errors;
