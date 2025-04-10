import { memo } from "react";

import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { Portal } from "@shared/ui/Primitives/Portal/Portal";
import { alertsReducer } from "../../model/slice/AlertsSlice";

import AlertsContainer from "./AlertContainer/AlertsContainer";

const initialReducers: ReducersList = {
  alerts: alertsReducer,
};

const AlertsSystem = memo(() => (
  <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
    <Portal>
      <AlertsContainer />
    </Portal>
  </DynamicModuleLoader>
));

export default AlertsSystem;
