import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "@app/providers/StoreProvider";

export const getUIScroll = (state: StateSchema) => state.ui.scroll;
export const getSidebarCollapsed = (state: StateSchema) => state.ui.sidebarCollapsed;

export const getUIScrollByPath = createSelector(
  getUIScroll,
  (_state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0,
);
