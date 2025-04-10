import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/ui";
import { useAppDispatch } from "../../../../shared/hooks";
import { useAlertsInfo } from "../../../../widgets/Nomenclature/model/libs/hooks/useAlertsInfo";
import { fetchDeleteFromSellerData } from "../../model/services/fetchDeleteFromSellerData";
import { IAlert } from "../../../../entities/Alerts";
import { ISellerOrder, sellerDataActions } from "../../../../entities/SellerOrders";
import { selectSumBasketActions } from "../../../../widgets/SumBasket/model/slice/stateBasketSlice";

interface DeleteFromSellerDataProps {
  SellerOrder : ISellerOrder;
}

const Component = ({ SellerOrder } : DeleteFromSellerDataProps) => {
  const dispatch = useAppDispatch();
  const alert = useAlertsInfo();
  const navigate = useNavigate();
  const paramsRequest = {
    document_guid: SellerOrder?.document_data?.document_header?.documentGUID!,
    user_guid: SellerOrder?.user_guid!,
  };

  const messageInfo : IAlert = {
    id: 1,
    text: "",
    title: "",
    type: "success",
  };

  const handleDeleteSellerData = async () => {
    const response = await dispatch(fetchDeleteFromSellerData(paramsRequest));
    if (response.meta.requestStatus === "fulfilled") {
      messageInfo.title = "Операция прошла успешно";
      messageInfo.text = `Документ ${SellerOrder?.document_data?.document_header?.number} удален`;
      const httpQuery = new URLSearchParams(location.search);
      dispatch(sellerDataActions.changeSellerData(undefined));
      httpQuery.delete("documentGUID");
      httpQuery.delete("contractGUID");
      navigate({
        // pathname: "/orders",
        search: `${httpQuery}`,
      });
      dispatch(selectSumBasketActions.setSumBasket(0));
    } else {
      messageInfo.title = "Возникли некоторые проблемы";
      messageInfo.text = `Документ ${SellerOrder?.document_data?.document_header?.number} не удалось удалить`;
    }
    alert.onOpenAlert(messageInfo);
  };

  return (
    <>
      <Button onClick={handleDeleteSellerData}>
        Удалить заказ
      </Button>
    </>
  );
};

export const DeleteFromSellerDataButton = React.memo(Component);
