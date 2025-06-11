import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { selectDateSchema } from "../../../../features/HistoryOrders";

const initialState: selectDateSchema = {
  endDate: "",
  beginDate: "",
};

const selectDateSlice = createSlice({
  name: "selectDate/history",
  initialState,
  reducers: {
    setBeginDate(state, action:PayloadAction<string>) {
      state.beginDate = action.payload;
    },
    setEndDate(state, action:PayloadAction<string>) {
      state.endDate = action.payload;
    },
  },
});

export const { actions: selectDateActions } = selectDateSlice;
export const { reducer: selectDateReducer } = selectDateSlice;
