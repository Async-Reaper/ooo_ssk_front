import React, { useEffect } from "react";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentTradePoint } from "../../../../entities/TradePoint";
import { useAppDispatch } from "../../../../shared/hooks";
import { Conditions } from "../../../../shared/libs/conditions/conditions";
import { fetchHistoryOrderProduct } from "../../model/services/fetchHistoryOrderProduct";
import { historyOrderProductReducer } from "../../model/slice/historyOrderProductSlice";
import { getHistoryOrderProductData } from "../../model/selectors/historyOrderProductSelectors";
import {
  HistoryOrderProductEmpty,
} from "../HistoryOrderProductEmpty/HistoryOrderProductEmpty";
import cls from "./HistoryOrderProductList.module.scss";
import { getRouteHistoryId } from "../../../../shared/const/router";
import { Typography } from "../../../../shared/ui";

interface HistoryOrderProductListProps {
  productId: string;
}

const reducers: ReducersList = {
  historyOrderProduct: historyOrderProductReducer,
};

const Component = ({ productId }: HistoryOrderProductListProps) => {
  const currentTradePoint = useSelector(getCurrentTradePoint);
  const historyOrderProductData = useSelector(getHistoryOrderProductData);
   
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHistoryOrderProduct({ contractGUID: currentTradePoint!.guid, productItem: productId }));
  }, [dispatch]);

  const onHandleOpenOrder = (document: string) => {
    navigate({
      pathname: getRouteHistoryId(document),
    });
  };

  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={reducers}
    >
      <Conditions condition={!historyOrderProductData?.arrayOfOrders?.length}>
        <HistoryOrderProductEmpty />
      </Conditions>
      <Conditions condition={historyOrderProductData?.arrayOfOrders?.length}>
        <div className={cls.list__wrapper}>
          {
            historyOrderProductData?.arrayOfOrders?.map((history) => (
              <div key={history.number}>
                <div onClick={() => onHandleOpenOrder(history.document_guid!)} className={cls.object_order}>
                  <Typography variant="h4" align="center" className={cls.order_text}>
                    {"Заказ № "}
                    {history.number}
                    {" от: "}
                    {history.date}
                  </Typography>
                  {/* {history.sum} */}
                  {/* {history.quantity} */}
                  {/* {history.price} */}
                </div>
              </div>
            ))
          }
        </div>
      </Conditions>
    </DynamicModuleLoader>
  );
};

export const HistoryOrderProductList = React.memo(Component);
