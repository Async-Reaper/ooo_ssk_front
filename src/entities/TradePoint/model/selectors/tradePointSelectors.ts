import { StateSchema } from "@app/providers/StoreProvider";

export const getTradePoints = (state: StateSchema) => state.tradePointForm?.data;
export const getCurrentTradePoint = (state: StateSchema) => state.tradePointForm?.currentPoint;
export const getTradePointIsLoading = (state: StateSchema) => state.tradePointForm?.isLoading;
