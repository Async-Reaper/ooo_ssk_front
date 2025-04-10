import { type StateSchema } from "@app/providers/StoreProvider";

export const getAlerts = (state: StateSchema) => state?.alerts?.alerts;
export const getAlertsInited = (state: StateSchema) => state?.alerts?._inited;
