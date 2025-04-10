import { type FC, lazy } from "react";

export const AlertSystemAsync = lazy<FC>(
  async () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(import("./AlertsSystem"));
    }, 1500);
  }),
);
