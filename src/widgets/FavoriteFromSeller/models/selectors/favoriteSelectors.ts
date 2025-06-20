import { StateSchema } from "@app/providers/StoreProvider";

export const getFavoriteData = (state: StateSchema) => state.favoriteSellerSchema?.data;
export const getFavoriteIsLoading = (state: StateSchema) => state.favoriteSellerSchema?.isLoading;
export const getFavoriteError = (state: StateSchema) => state.favoriteSellerSchema?.error;
