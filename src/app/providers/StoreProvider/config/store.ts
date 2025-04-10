import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { type CombinedState, type Reducer } from "redux";
import { $api } from "@shared/protocols/api";
import { userReducer } from "@entities/user";
import { uiReducer } from "@features/UI";
import { searchProductReducer } from "@features/SearchProduct";
import { StateSchema, ThunkExtraArg } from "./StateSchema";
import { createReducerManager } from "./reducerManager";

export function createReduxStore(
  _initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducer: ReducersMapObject<StateSchema> = {
    user: userReducer,
    ui: uiReducer,
    search: searchProductReducer,
    ...asyncReducers,
  };

  const reducerManager = createReducerManager(rootReducer);

  const extraArg: ThunkExtraArg = {
    api: $api,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      },
      serializableCheck: false,
    }),
  });
  // @ts-expect-error
  store.reducerManager = reducerManager;
   
  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
