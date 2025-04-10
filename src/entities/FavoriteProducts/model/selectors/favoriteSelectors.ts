import { StateSchema } from "@app/providers/StoreProvider";

export const getFavoriteData = (state: StateSchema) => state.favoriteList?.data;
export const getFavoriteIsLoading = (state: StateSchema) => state.favoriteList?.isLoading;
export const getFavoriteErrors = (state: StateSchema) => state.favoriteList?.errors;
