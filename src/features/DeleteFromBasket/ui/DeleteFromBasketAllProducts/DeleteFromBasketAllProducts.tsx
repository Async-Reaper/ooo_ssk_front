import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../../../shared/ui";
import { getUserAuthData } from "../../../../entities/user";
import { IBasket } from "../../../../entities/BasketEntitie";
import { getCurrentTradePoint } from "../../../../entities/TradePoint";
import { deleteFromBasketActions, fetchDeleteFromBasket } from "../../../../features/DeleteFromBasket";
import { useAppDispatch } from "../../../../shared/hooks";
import { IDeleteFromBasket } from "../../model/types/deleteFromBasket";
import { fetchSumBasketByParams } from "../../../../widgets/SumBasket/model/services/fetchSumBasket";
import { selectSumBasketReducer } from "../../../../widgets/SumBasket/model/slice/stateBasketSlice";
import { DynamicModuleLoader } from "../../../../shared/libs/component";
import { GetСurrentBasketSum } from "../../../../widgets/SumBasket";

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
   
  const currentBasketSum = useSelector(GetСurrentBasketSum); 

  useEffect(() => {
    dispatch(fetchSumBasketByParams({ userGuid: user!.userGUID, contractGuid: currentTradePoint?.guid! }));
  }, [dispatch, user, currentTradePoint, currentBasketSum]);
   
  return (
    <DynamicModuleLoader reducers={reducers}>

      <>
        {basketProductsList?.length
          ? (
            <Button onClick={onHandleDeleteProductFromBasket}>
              Очистить корзину
            </Button>
          )
          : ""}
      </>
    </DynamicModuleLoader>
  );
};

export const DeleteFromBasketAllProducts = React.memo(Component);
