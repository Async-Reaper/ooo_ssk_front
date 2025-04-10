import React, { ReactNode, useEffect } from "react";
import { ReduxStoreWithManager, StateSchema, StateSchemaKey } from "@app/providers/StoreProvider/config/StateSchema";
import { type Reducer } from "@reduxjs/toolkit";
import { useStore } from "react-redux";
import { useAppDispatch } from "@shared/hooks";

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>
}

interface DynamicModuleLoaderProps {
  children: ReactNode;
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
}

const Component = (props: DynamicModuleLoaderProps) => {
  const {
    reducers,
    removeAfterUnmount,
    children,
  } = props;

  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useAppDispatch();
  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();
    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey];
      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${name} reducer` });
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
  }, []);

  return <>{children}</>;
};

export const DynamicModuleLoader = React.memo(Component);
