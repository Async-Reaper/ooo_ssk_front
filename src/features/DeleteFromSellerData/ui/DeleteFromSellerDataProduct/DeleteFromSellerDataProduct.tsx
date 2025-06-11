import React from "react";
import { useSelector } from "react-redux";
import { Button, AppImage } from "@shared/ui";
import { useAppDispatch } from "@shared/hooks";
import { useAlertsInfo } from "@widgets/Nomenclature";
import { IAlert } from "@entities/Alerts";
import {
  Product, getCurrentSellerOrders, sellerDataActions, 
} from "@entities/SellerOrders";
import { fetchAddToSellerData } from "@features/AddToSellerData";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { selectSumBasketReducer } from "@widgets/SumBasket";

interface DeleteFromSellerDataProps {
  productGUID: string;
  productName: string;
}

const reducers : ReducersList = {
  CurrentSumBusket: selectSumBasketReducer,
};

const Component = ({ productGUID, productName }: DeleteFromSellerDataProps) => {
  const dispatch = useAppDispatch();
  const alert = useAlertsInfo();
  const currentSellerOrder = useSelector(getCurrentSellerOrders);
  const messageInfo: IAlert = {
    id: 1,
    text: "",
    title: "",
    type: "success",
  };

  const handleDeleteSellerData = async () => {
    const dataBasket = { ...currentSellerOrder! };

    const updatedProducts = dataBasket?.document_data?.products?.filter(
      (product: Product) => product.product_guid && product.product_guid !== productGUID,
    );
     
    dataBasket.document_data = {
      ...dataBasket.document_data,
      products: updatedProducts,
    };
    const response = await dispatch(fetchAddToSellerData(dataBasket));
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(sellerDataActions.changeSellerData(dataBasket));
      messageInfo.title = "Операция прошла успешно";
      messageInfo.text = `${productName} удален`;
    } else {
      messageInfo.title = "Возникли некоторые проблемы";
      messageInfo.text = `${productName} не удалось удалить`;
    }
    alert.onOpenAlert(messageInfo);
  };

  return (
    <DynamicModuleLoader reducers={reducers}>
      {productGUID?.length
        ? (
          <Button size="xs" variant="transpar" onClick={handleDeleteSellerData}>
            <AppImage src="./common/trashbox.svg" />
          </Button>
        )
        : ""}
    </DynamicModuleLoader>
  );
};

export const DeleteFromSellerDataProductButton = React.memo(Component);
