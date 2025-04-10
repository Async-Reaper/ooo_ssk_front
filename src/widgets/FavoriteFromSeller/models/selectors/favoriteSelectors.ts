import { StateSchema } from "@app/providers/StoreProvider";

export const getFavoriteData = (state: StateSchema) => state.favoriteSchem?.data!;
export const getFavoriteIsLoading = (state: StateSchema) => state.favoriteSchem?.isLoading;
export const getFavoriteError = (state: StateSchema) => state.favoriteSchem?.error;
