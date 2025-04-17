import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, HStack, Typography } from "@shared/ui";
import { getCurrentTradePoint } from "@entities/TradePoint";
import { useAppDispatch } from "@shared/hooks";
import { ReducersList, DynamicModuleLoader } from "@shared/libs/component";
import { fetchHistoryOrders } from "../../model/services/fetchHistoryOrders";
import { selectDateActions, sellerDataReducer } from "../../model/slice/selectDataSlice";
import { getSelectDate } from "../../model/selectors/historyOrdersSelectors";
import cls from "./SelectDate.module.scss";

const reducers: ReducersList = {
  selectDate: sellerDataReducer,
};

const Component = () => {
  const selectDate = useSelector(getSelectDate);
  const [startDate, setStartDate] = useState<any>(selectDate?.beginDate || "");
  const [endDate, setEndDate] = useState<any>(selectDate?.endDate || "");
  const currentTradePoint = useSelector(getCurrentTradePoint);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(selectDateActions.setBeginDate(startDate));
    dispatch(selectDateActions.setEndDate(endDate));
  }, [dispatch, startDate, endDate, currentTradePoint]);

  const onHandleSelect = useCallback(() => {
    if (!startDate.length || !endDate.length || !currentTradePoint?.guid.length) {
      return;
    }

    const paramRequest = {
      startDate: startDate.replace(/-/g, ""),
      endDate: endDate.replace(/-/g, ""),
      contractGUID: String(currentTradePoint?.guid),
    };
    dispatch(fetchHistoryOrders(paramRequest));
  }, [dispatch, startDate, endDate, currentTradePoint]);
  
  return (
    <DynamicModuleLoader
      reducers={reducers}
    >
      <div className={cls.select__wrapper}>
        <HStack gap="16" align="center">
          <label htmlFor="start">
            <Typography variant="h4">
              C:
            </Typography>
          </label>
          <input
            className={cls.input_date}
            id="start"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </HStack>
        <HStack gap="16" align="center">
          <label htmlFor="end">
            <Typography variant="h4">
              По:
            </Typography>
          </label>
          <input
            className={cls.input_date}
            id="end"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </HStack>
        <Button onClick={onHandleSelect} disabled={!currentTradePoint}>
          <Typography variant="h4">
            Поиск
          </Typography>
        </Button>
      </div>
    </DynamicModuleLoader>
  );
};

export const SelectDate = React.memo(Component);
