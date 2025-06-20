import React, { useCallback } from "react";
import { Button, Typography } from "@shared/ui";
import { useAppDispatch, useModal } from "@shared/hooks";
import { deleteFromBasketActions, fetchDeleteFromBasket } from "@features/DeleteFromBasket";
import { useAlertsInfo } from "@widgets/Nomenclature/model/libs/hooks/useAlertsInfo";
import {
  selectSumBasketActions, selectSumBasketReducer, fetchSumBasketByParams, sumBasketReducer, 
} from "@widgets/SumBasket";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";

import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserRole, UserRoles } from "@entities/user";
import { getRouteOrders } from "@shared/const/router";
import { ICreateOrder } from "../../model/types/createOrder";
import { fetchCreateOrder } from "../../model/services/fetchCreateOrder";
import { CreateOrderModal } from "../CreateOrderModal/CreateOrderModal";

interface CreateOrderButtonProps {
  dataCreateOrder: ICreateOrder
}

const reducers : ReducersList = {
  CurrentSumBusket: selectSumBasketReducer,
  SumBusket: sumBasketReducer,
};

const Component = ({ dataCreateOrder }: CreateOrderButtonProps) => {
  const dispatch = useAppDispatch();
  const alertBox = useAlertsInfo();
  const userRole = useSelector(getUserRole);
  const navigate = useNavigate();
   
  const { isOpen, open, close } = useModal();
  
  const onHandleDeleteProductFromBasket = useCallback(() => {
    dataCreateOrder.products.map(async (product) => {
      await dispatch(fetchDeleteFromBasket({ 
        productGuid: product.product_guid, 
        userGuid: dataCreateOrder.header.userGUID, 
        contractGuid: dataCreateOrder.header.contractGUID, 
      }));
      dispatch(deleteFromBasketActions.deleteFromBasket(product.product_guid));
    });   
  }, [dispatch, dataCreateOrder]);
   
  const onHandleCreateOrder = useCallback(async () => {
    const response = await dispatch(fetchCreateOrder(dataCreateOrder));  
      
    if (response.meta.requestStatus === "fulfilled") {
      onHandleDeleteProductFromBasket();
      alertBox.onOpenAlert({
        id: 1,
        type: "success",
        title: "Успешно",
        text: "Заказ поступил в обработку.",
      });
      dispatch(fetchSumBasketByParams({ userGuid: dataCreateOrder.header.userGUID, contractGuid: dataCreateOrder.header.contractGUID }));
      dispatch(selectSumBasketActions.setSumBasket(0));
      userRole === UserRoles.SELLER && navigate(getRouteOrders());
    } else {
      open();
    }
    // console.log(dataCreateOrder)
  }, [dispatch, dataCreateOrder, open]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Button onClick={onHandleCreateOrder} variant="contained">
        <Typography variant="h4">
          Оформить заказ
        </Typography>
      </Button>
      <CreateOrderModal isOpen={isOpen} onClose={close} />
    </DynamicModuleLoader>
  );
};

export const CreateOrderButton = React.memo(Component);
