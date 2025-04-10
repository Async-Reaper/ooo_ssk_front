import { StateSchema } from "@app/providers/StoreProvider";

export const getSumBasketOrder = (state: StateSchema) => state.SumBusket?.data?.sumOrder;
export const getCountBasketOrder = (state: StateSchema) => state.SumBusket?.data?.countProduct;
export const getBasketSumIsLoading = (state: StateSchema) => state?.SumBusket?.isLoading;
export const getBasketSumError = (state: StateSchema) => state?.SumBusket?.error;
export const GetСurrentBasketSum = (state: StateSchema) => state?.CurrentSumBusket?.sumBasket;
