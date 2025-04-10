import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { AppImage, Button } from "../../../../shared/ui";
import { getUserAuthData } from "../../../../entities/user";
import { getCurrentTradePoint } from "../../../../entities/TradePoint";
import { deleteFromBasketActions, fetchDeleteFromBasket } from "../../../../features/DeleteFromBasket";
import { useAppDispatch } from "../../../../shared/hooks";
import { IDeleteFromBasket } from "../../model/types/deleteFromBasket";
import { useAlertsInfo } from "../../../../widgets/Nomenclature/model/libs/hooks/useAlertsInfo";
import { IAlert } from "../../../../entities/Alerts";
import { fetchSumBasketByParams } from "../../../../widgets/SumBasket/model/services/fetchSumBasket";

interface DeleteFromBasketAllProductsProps {
  productGUID : string;
  productName : string;
}

const Component = ({ productGUID, productName }: DeleteFromBasketAllProductsProps) => {
  const currentTradePoint = useSelector(getCurrentTradePoint);
  const user = useSelector(getUserAuthData);
  const dispatch = useAppDispatch();
  const alert = useAlertsInfo();
  const message : IAlert = {
    id: 1,
    text: "",
    title: "",
    type: "success",
  };
  const onHandleDeleteProductFromBasket = useCallback(async () => {
    const paramsSend: IDeleteFromBasket = { 
      productGuid: productGUID, 
      userGuid: user?.userGUID!, 
      contractGuid: currentTradePoint?.guid!, 
    };
    const response = await dispatch(fetchDeleteFromBasket(paramsSend));
    if (response.meta.requestStatus === "fulfilled") {
      message.text = `Товар ${productName} удален`;
      message.title = "Успех!";
      message.type = "success";
      dispatch(deleteFromBasketActions.deleteFromBasket(productGUID));
    } else {
      message.text = `Товар ${productName} не удалось удалить`;
      message.title = "Ошибка";
      message.type = "error";
    }
    alert.onOpenAlert(message);
    dispatch(fetchSumBasketByParams({ userGuid: user!.userGUID, contractGuid: currentTradePoint?.guid! }));
  }, [dispatch, productGUID, user, currentTradePoint]);

  return (
    <>
      {productGUID?.length
        ? (
          <Button size="xs" variant="transpar" onClick={onHandleDeleteProductFromBasket}>
            <AppImage src="./common/trashbox.svg" />
          </Button>
        )
        : ""}
    </>
  );
};

export const DeleteFromBasketSelectProduct = React.memo(Component);
