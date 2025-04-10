import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Conditions } from "../../../../shared/libs/conditions/conditions";
import { Skeleton } from "../../../../shared/ui/Skeleton";
import { Typography, VStack } from "../../../../shared/ui";
import { DynamicModuleLoader, ReducersList } from "../../../../shared/libs/component/DynamicModuleLoader/DynamicModuleLoader";
import { HistoryOrdersEmpty } from "../HistoryOrdersEmpty/HistoryOrdersEmpty";
import { historyOrdersReducer } from "../../model/slice/historyOrdersSlice";
import { getHistoryOrdersIsLoading, getHistoryOrdersList } from "../../model/selectors/historyOrdersSelectors";
import cls from "./HistoryOrdersList.module.scss";
import { Substrate } from "../../../../shared/ui/Primitives/Container/Container";

const reducers: ReducersList = {
  historyOrdersList: historyOrdersReducer,
};

const Component = () => {
  const historyOrdersList = useSelector(getHistoryOrdersList);
  const historyOrdersIsLoading = useSelector(getHistoryOrdersIsLoading);
  const navigate = useNavigate();

  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={reducers}
    >
      <Substrate>
        <VStack max>
          <Conditions condition={historyOrdersIsLoading}>
            {new Array(10).fill(null).map((_, index) =>
            // eslint-disable-next-line react/no-array-index-key,implicit-arrow-linebreak
              <Skeleton key={index} width="100%" height="75px" border="10px" />)}
          </Conditions>
            
          {historyOrdersList?.map((historyItem) => (
            <div
              key={historyItem.documentGUID} 
              className={cls.history__orders__wrapper}
              onClick={() => navigate(`/history/${historyItem?.documentGUID}`)}
            >
              <div className={cls.history__orders__info}>
                <Typography variant="h3">
                  {historyItem.date}
                </Typography>
              </div>
              <div className={cls.history__orders__info}>
                <Typography variant="h3">
                  Отгрузка №
                  {" "}
                  {historyItem.number}
                  {" "}
                  от
                  {" "}
                  {historyItem.date}
                </Typography>
              </div>
              <div className={cls.history__orders__info}>
                <Typography variant="h3">
                  {historyItem.amount}
                  {" "}
                  ₽
                </Typography>
              </div>
            </div>
          ))}
          <Conditions condition={!historyOrdersList?.length && !historyOrdersIsLoading}>
            <HistoryOrdersEmpty />
          </Conditions>
        </VStack>
      </Substrate>
    </DynamicModuleLoader>
  );
};

export const HistoryOrdersList = React.memo(Component);
