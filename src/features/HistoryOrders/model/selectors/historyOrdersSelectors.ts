import { StateSchema } from "@app/providers/StoreProvider";

export const getSelectDate = (state: StateSchema) => state.selectDate;
export const getHistoryOrdersList = (state: StateSchema) => state.historyOrdersList?.data;
export const getHistoryOrdersIsLoading = (state: StateSchema) => state.historyOrdersList?.isLoading;
export const getHistoryOrdersError = (state: StateSchema) => state.historyOrdersList?.error;
