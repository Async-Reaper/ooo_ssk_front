import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type UISchema } from "../types/UISchema";

const initialState: UISchema = {
  scroll: {},
  sidebarCollapsed: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setScrollPosition: (
      state,
      { payload }: PayloadAction<{ path: string; position: number }>,
    ) => {
      state.scroll[payload.path] = payload.position;
    },
    setSidebarCollapsed: (state, { payload }: PayloadAction<boolean>) => {
      state.sidebarCollapsed = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: uiActions } = uiSlice;
export const { reducer: uiReducer } = uiSlice;
