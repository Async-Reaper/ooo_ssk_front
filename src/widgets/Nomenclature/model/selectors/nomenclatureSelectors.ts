import { StateSchema } from "@app/providers/StoreProvider";

export const getNomenclatureData = (state: StateSchema) => state.nomenclature?.data;
export const getNomenclatureByIdList = (state: StateSchema) => state.nomenclature?.list;
export const getNomenclatureIsLoading = (state: StateSchema) => state.nomenclature?.isLoading;
export const getNomenclatureError = (state: StateSchema) => state.nomenclature?.error;
