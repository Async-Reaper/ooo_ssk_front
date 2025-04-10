import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HStack, Typography } from "../../../../shared/ui";
import { getCurrentTradePoint } from "../../../../entities/TradePoint";
import { useAppDispatch } from "../../../../shared/hooks";
import { fetchHistoryOrders } from "../../model/services/fetchHistoryOrders";
import cls from "./SelectDate.module.scss";
import { selectDateActions, sellerDataReducer } from "../../model/slice/selectDataSlice";
import { ReducersList, DynamicModuleLoader } from "../../../../shared/libs/component";
import { getSelectDate } from "../../model/selectors/historyOrdersSelectors";

const Component = () => {
  const selectDate = useSelector(getSelectDate);
  const [startDate, setStartDate] = useState<any>(selectDate?.beginDate || "");
  const [endDate, setEndDate] = useState<any>(selectDate?.endDate || "");
  const currentTradePoint = useSelector(getCurrentTradePoint);

  const dispatch = useAppDispatch();
  const reducers: ReducersList = {
    selectDate: sellerDataReducer,
  };

  useEffect(() => {
    dispatch(selectDateActions.setBeginDate(startDate));
    dispatch(selectDateActions.setEndDate(endDate));
      
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
            <Typography variant="h3">
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
            <Typography variant="h3">
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
        {/* <Button onClick={onHandleSelect}>
               <Typography>
                  Поиск
               </Typography>
            </Button> */}
      </div>
    </DynamicModuleLoader>
  );
};

export const SelectDate = React.memo(Component);
