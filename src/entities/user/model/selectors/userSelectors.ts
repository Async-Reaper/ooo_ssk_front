import { StateSchema } from "@app/providers/StoreProvider";

export const getUserAuthData = (state: StateSchema) => state.user.data;
export const getUserInited = (state: StateSchema) => state.user._inited;
export const getUserisLoading = (state: StateSchema) => state.user.isLoading;
export const getUserRole = (state: StateSchema) => state.user.data?.role;
export const getUserOrders = (state: StateSchema) => state.user.data?.user_info?.orders;
