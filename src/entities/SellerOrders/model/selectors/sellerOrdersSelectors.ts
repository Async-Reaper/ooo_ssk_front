import { StateSchema } from "@app/providers/StoreProvider";

export const getSellerOrders = (state: StateSchema) => state.sellerOrdersForm?.data;
export const getCurrentSellerOrders = (state: StateSchema) => state.sellerOrdersForm?.currentOrder;
export const getSellerOrdersIsLoading = (state: StateSchema) => state.sellerOrdersForm?.isLoading;
