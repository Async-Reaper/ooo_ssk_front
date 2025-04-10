export type { DebtsSchema, IDebtsData } from "./model/types/debts";
export { fetchDebts } from "./model/services/fetchDebts";
export { debtsActions, debtsReducer } from "./model/slice/debtsSlice";
export * from "./model/selectors/debtsSelectors";
