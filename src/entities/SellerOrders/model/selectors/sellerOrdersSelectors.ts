import { StateSchema } from "@app/providers/StoreProvider";

export const getSellerOrders = (state: StateSchema) => state.sellerOrders?.data;
export const getCurrentSellerOrders = (state: StateSchema) => state.sellerOrders?.currentOrder;
export const getSellerOrdersIsLoading = (state: StateSchema) => state.sellerOrders?.isLoading;
