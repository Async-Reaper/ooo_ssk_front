import { lazy } from "react";

export const TestingPageAsync = lazy(async () => import("./TestingPage"));
