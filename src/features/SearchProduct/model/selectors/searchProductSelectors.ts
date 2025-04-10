import { StateSchema } from "@app/providers/StoreProvider";

export const getSearchValue = (state: StateSchema) => state.search.value;
