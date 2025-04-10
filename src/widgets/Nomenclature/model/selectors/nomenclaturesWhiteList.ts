import { StateSchema } from "@app/providers/StoreProvider";

export const getNomenclaturesWhiteList = (state: StateSchema) => state.nomenclaturesWhiteList?.data;
export const getNomenclaturesWhiteListIsLoading = (state: StateSchema) => state.nomenclaturesWhiteList?.isLoading;
