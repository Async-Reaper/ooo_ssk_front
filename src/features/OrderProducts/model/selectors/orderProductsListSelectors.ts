import { StateSchema } from "@app/providers/StoreProvider";

export const getOrdersProductsData = (state: StateSchema) => state.orderProductList?.data?.products;
export const getOrdersProductsIsLoading = (state: StateSchema) => state.orderProductList?.isLoading;
export const getOrdersProductsError = (state: StateSchema) => state.orderProductList?.error;
