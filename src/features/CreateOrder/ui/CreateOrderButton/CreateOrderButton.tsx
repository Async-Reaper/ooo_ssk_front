import React, { useCallback } from "react";
import { Button, Typography } from "@shared/ui";
import { useAppDispatch, useModal } from "@shared/hooks";
import { deleteFromBasketActions, fetchDeleteFromBasket } from "@features/DeleteFromBasket";
import { ICreateOrder } from "../../model/types/createOrder";
import { fetchCreateOrder } from "../../model/services/fetchCreateOrder";
import { CreateOrderModal } from "../CreateOrderModal/CreateOrderModal";
import { useAlertsInfo } from "../../../../widgets/Nomenclature/model/libs/hooks/useAlertsInfo";
import { selectSumBasketActions, selectSumBasketReducer } from "../../../../widgets/SumBasket/model/slice/stateBasketSlice";
import { DynamicModuleLoader, ReducersList } from "../../../../shared/libs/component";
import { fetchSumBasketByParams, sumBasketReducer } from "../../../../widgets/SumBasket";

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
    } else {
      open();
    }
  }, [dispatch, dataCreateOrder, open]);
  return (
    <DynamicModuleLoader reducers={reducers}>
      <Button onClick={onHandleCreateOrder}>
        <Typography variant="h4">
          Оформить заказ
        </Typography>
      </Button>
      <CreateOrderModal isOpen={isOpen} onClose={close} />
    </DynamicModuleLoader>
  );
};

export const CreateOrderButton = React.memo(Component);
