import { StateSchema } from "@app/providers/StoreProvider";

export const getNomenclaturesList = (state: StateSchema) => state.nomenclaturesList?.products;
export const getNomenclaturesCount = (state: StateSchema) => state.nomenclaturesList?.total_count_products;
export const getNomenclaturesListIsLoading = (state: StateSchema) => state.nomenclaturesList?.isLoading;
