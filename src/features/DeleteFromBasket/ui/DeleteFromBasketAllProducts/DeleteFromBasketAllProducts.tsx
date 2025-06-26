import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Typography } from "@shared/ui";
import { getUserAuthData } from "@entities/user";
import { IBasket } from "@entities/BasketEntitie";
import { getCurrentTradePoint } from "@entities/TradePoint";
import { useAppDispatch } from "@shared/hooks";
import { fetchSumBasketByParams, getCurrentBasketSum, selectSumBasketReducer } from "@widgets/SumBasket";
import { DynamicModuleLoader } from "@shared/libs/component";

import { IDeleteFromBasket } from "../../model/types/deleteFromBasket";
import { deleteFromBasketActions } from "../../model/slice/deleteFromBasketSlice";
import { fetchDeleteFromBasket } from "../../model/services/fetchDeleteFromBasket";

const reducers = {
  CurrentSumBusket: selectSumBasketReducer,
};

interface DeleteFromBasketAllProductsProps {
  basketProductsList: IBasket[]
}

const Component = ({ basketProductsList }: DeleteFromBasketAllProductsProps) => {
  const currentTradePoint = useSelector(getCurrentTradePoint);
  const user = useSelector(getUserAuthData);
  const dispatch = useAppDispatch();
  
  const onHandleDeleteProductFromBasket = useCallback(async () => {
    basketProductsList!.forEach(async (product) => {
      const paramsSend: IDeleteFromBasket = { 
        productGuid: product.product_guid, 
        userGuid: user?.userGUID!, 
        contractGuid: currentTradePoint?.guid!, 
      };
      const response = await dispatch(fetchDeleteFromBasket(paramsSend));
      if (response.meta.requestStatus === "fulfilled") {
        dispatch(deleteFromBasketActions.deleteFromBasket(product.product_guid));
        dispatch(fetchSumBasketByParams({ userGuid: user?.userGUID!, contractGuid: currentTradePoint?.guid! }));
      }
    });
  }, [dispatch, basketProductsList, user, currentTradePoint]);
   
  const currentBasketSum = useSelector(getCurrentBasketSum); 

  useEffect(() => {
    dispatch(fetchSumBasketByParams({ userGuid: user!.userGUID, contractGuid: currentTradePoint?.guid! }));
  }, [dispatch, user, currentTradePoint, currentBasketSum]);
   
  return (
    <DynamicModuleLoader reducers={reducers}>
      {basketProductsList?.length
        ? (
          <Button onClick={onHandleDeleteProductFromBasket} variant="contained">
            <Typography variant="h4" bold align="center">
              Очистить корзину
            </Typography>
          </Button>
        )
        : ""}
    </DynamicModuleLoader>
  );
};

export const DeleteFromBasketAllProducts = React.memo(Component);
