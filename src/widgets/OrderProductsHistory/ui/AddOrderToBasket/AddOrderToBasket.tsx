import { getCurrentTradePoint } from "@entities/TradePoint";
import { getUserAuthData } from "@entities/user";
import { addToBasketActions, addToBasketReducer, fetchAddToBasket } from "@features/AddToBasket";
import { useAppDispatch } from "@shared/hooks";
import { Button, Typography } from "@shared/ui";
import { getNomenclatureByIdList, nomenclatureReducer } from "@widgets/Nomenclature";
import { useAlertsInfo } from "@widgets/Nomenclature/model/libs/hooks/useAlertsInfo";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { basketReducer, fetchBasketProductWithContract, getBasketData } from "@entities/BasketEntitie";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import {
  getOrdersHistoryProductsData,
} from "../../model/selectors/orderProductsHistoryListSelectors";
import { orderProductHistoryListReducer } from "../../model/slice/orderProductHistoryListSlice";

const reducers: ReducersList = {
  orderProductHistoryList: orderProductHistoryListReducer,
  nomenclaturesList: nomenclatureReducer,
  addToBasketForm: addToBasketReducer,
  basketList: basketReducer,
};

const Component = () => {
  const dispatch = useAppDispatch();
  const alertInfo = useAlertsInfo();
  const basketProducts = useSelector(getBasketData);
  const currentTradePoint = useSelector(getCurrentTradePoint);
  const user = useSelector(getUserAuthData);
  const orderHistoryListData = useSelector(getOrdersHistoryProductsData);
  const [isDisabled, setIsDisabled] = useState(false);
  const nomenclatureList = useSelector(getNomenclatureByIdList);

  useEffect(() => {
    dispatch(fetchBasketProductWithContract({ userGuid: user!.userGUID, contractGuid: currentTradePoint!.guid }));
    
    basketProducts?.map((productBasket) => {
      const thisProduct = orderHistoryListData?.find((productHistory) => productBasket.product_guid === productHistory.product_guid);

      if (thisProduct) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    });
  }, [dispatch, orderHistoryListData, setIsDisabled]);

  const onAddOrderToBasket = useCallback(() => {
    orderHistoryListData?.map((order) => {
      const thisProduct = nomenclatureList?.find((product) => product.guid === order.product_guid);

      if (thisProduct) {
        const remains = thisProduct?.additional_information?.remains;
        if (remains > 0) {  
          dispatch(fetchAddToBasket({
            product_guid: order.product_guid,
            count: order.count,
            contract_guid: currentTradePoint!.guid,
            user_guid: user!.userGUID,
          }));
          dispatch(addToBasketActions.addToBasket({
            product_guid: order.product_guid,
            user_guid: user!.userGUID,
            contract_guid: currentTradePoint!.guid,
            count: order.count,
          }));     
          
          setIsDisabled(true);
        } else {
          alertInfo.onOpenAlert({
            id: 1,
            title: "Не удалось добавить в корзину.",
            text: `Товар "${thisProduct?.short_name}" закончился`,
            type: "error",
          });
        }
      }
    });
  }, [dispatch, orderHistoryListData, nomenclatureList, user, currentTradePoint]);

  useEffect(() => {

  }, []);

  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={reducers}
    >
      <Button disabled={isDisabled} onClick={onAddOrderToBasket}>
        <Typography variant="h3">
          {
            isDisabled 
              ? "Заказ добавлен в корзину"
              : "Добавить заказ в корзину"
          }
        </Typography>
      </Button>
    </DynamicModuleLoader>
  );
};

export const AddOrderToBasket = React.memo(Component);
