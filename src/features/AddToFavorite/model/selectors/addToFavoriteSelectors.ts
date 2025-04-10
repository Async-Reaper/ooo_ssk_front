import { StateSchema } from "@app/providers/StoreProvider";

export const getAddToFavoriteIsLoading = (state: StateSchema) => state.addToFavoriteForm?.isLoading;
export const getAddToFavoriteTextResponse = (state: StateSchema) => state.addToFavoriteForm?.textResponse;
export const getAddToFavoriteErrors = (state: StateSchema) => state.addToFavoriteForm?.errors;
