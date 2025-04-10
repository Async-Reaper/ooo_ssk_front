import { StateSchema } from "@app/providers/StoreProvider";

export const getNomenclatureGroupData = (state: StateSchema) => state.nomenclatureGroupList?.data;
export const getNomenclatureGroupIsLoading = (state: StateSchema) => state.nomenclatureGroupList?.isLoading;
export const getNomenclatureGroupErrors = (state: StateSchema) => state.nomenclatureGroupList?.errors;
