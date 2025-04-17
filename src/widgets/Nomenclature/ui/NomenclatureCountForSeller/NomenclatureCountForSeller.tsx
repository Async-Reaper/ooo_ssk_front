import React, { useCallback, useState } from "react";
import {
  Button, Input,
} from "@shared/ui";
import { useAppDispatch } from "@shared/hooks";
import { fetchGetSellerData, getSellerDataActions } from "@features/GetSellerData";
import { fetchAddToSellerData } from "@features/AddToSellerData";

import { IAlert } from "@entities/Alerts";
import { selectSumBasketReducer } from "@widgets/SumBasket";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { sellerDataReducer } from "@entities/SellerOrders";
import { Icon } from "@shared/libs/icons";
import { useAlertsInfo } from "../../model/libs/hooks/useAlertsInfo";
import { INomenclature } from "../../model/types/nomenclature";
import cls from "../NomenclatureCount/NomenclatureCount.module.scss";

interface NomenclatureCountForSellerProps {
  countValue?: number;
  nomenclatureData: INomenclature;
  documentGUID?: string;
  userGUID?: string;
  productGUID?: string;
  isShow?: boolean | false;
  price?: number;
}

const Component = ({
  nomenclatureData, 
  countValue, 
  documentGUID,
  userGUID,
  productGUID,
  isShow,
  price,
}: NomenclatureCountForSellerProps) => {
  const reducers: ReducersList = {
    CurrentSumBusket: selectSumBasketReducer,
    sellerOrdersForm: sellerDataReducer,
  };
   
  const dispatch = useAppDispatch();

  const calculateAmount = (products: any[]) => products.reduce((amount: number, product: any) => amount + (product.count || 0) * (product.price || 0), 0);
   
  const alert = useAlertsInfo();
  let priceConfirm = 0;
  if (price !== undefined && price !== null && price !== 0) {
    priceConfirm = price;
  } 
  if (priceConfirm === 0 && nomenclatureData?.additional_information !== undefined
         && nomenclatureData?.additional_information !== null) priceConfirm = nomenclatureData?.additional_information.price;

  // const formattedPrice: string = priceConfirm !== undefined
  //    ? `${priceConfirm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`
  //    : "0 ₽";

  const [countToBasket, setCountToBasket] = useState(countValue || 0);
  const multiplicity = nomenclatureData?.multiplicity === 0
    ? 1
    : nomenclatureData?.multiplicity;
  const thisGUID = productGUID || nomenclatureData?.guid;

  let remains = nomenclatureData === undefined || nomenclatureData.additional_information === null
    ? 0
    : nomenclatureData.additional_information.remains;
  if (remains === 0) {
    remains = countValue || 0;
  }
  const detectCorrectCount = (count: number) => {
    if (remains === 0 && count < countToBasket) {
      return false;
    }

    const alertBox : IAlert = {
      id: 1,
      type: "error",
      title: "Не удалось изменить количество!",
      text: "",
    };
         
    if (count > remains) {
      alertBox.text = "Не хватает товара на складе. \n Установлено максимальное значение";
      alert.onOpenAlert(alertBox);
      setCountToBasket(remains === 0
        ? countToBasket
        : remains);
      return true;
    }
    return false;
  };

  const onHandleAddOrRemoveSellerData = useCallback(async (elem: number) => {
    const isNotCorrectCount = detectCorrectCount(elem);
    if (isNotCorrectCount) {
      return;
    }
    
    const response = await dispatch(fetchGetSellerData({
      user_guid: userGUID!,
      document_guid: documentGUID!,
    }));
    
    if (response.meta.requestStatus === "fulfilled") {
      const dataBasket = { ...response.payload };
    
      if (elem <= 0) {
        const updatedProducts = dataBasket.document_data.products.filter(
          (item: { product_guid: any; }) => item.product_guid !== thisGUID,
        );
        dataBasket.document_data = {
          ...dataBasket.document_data,
          products: updatedProducts,
        };
        dispatch(getSellerDataActions.freshView(dataBasket));
      } else {
        const documentDataCopy = { ...dataBasket.document_data };
        const newProducts = [...documentDataCopy.products];
        const findElementIndex = newProducts.findIndex(
          (el: { product_guid: string }) => el.product_guid === thisGUID,
        );
         
        if (findElementIndex !== -1) {
          newProducts[findElementIndex] = {
            ...newProducts[findElementIndex],
            count: elem,
            price: priceConfirm,
          };
        } else {
          newProducts.push({
            product_guid: nomenclatureData.guid,
            count: elem,
            price: priceConfirm,
          });
        }
         
        documentDataCopy.products = newProducts;
        dataBasket.document_data = documentDataCopy;
      }
    
      const newAmount = calculateAmount(dataBasket.document_data.products);
    
      const newDocumentHeader = { ...dataBasket.document_data.document_header, amount: newAmount };
    
      const newDocumentData = { ...dataBasket.document_data, document_header: newDocumentHeader };

      const newDataBasket = { ...dataBasket, document_data: newDocumentData };

      const resultAppendSellerData = await dispatch(fetchAddToSellerData(newDataBasket));

      if (resultAppendSellerData.meta.requestStatus === "fulfilled") {
        setCountToBasket(elem);
      } else {
        setCountToBasket(countToBasket);
      }
    }
  }, [dispatch, nomenclatureData, setCountToBasket, userGUID, documentGUID, countToBasket]);
   
  const onHandleAddToBasket = () => {
    setCountToBasket(countToBasket + multiplicity);
    onHandleAddOrRemoveSellerData(countToBasket + multiplicity);
  };
    
  const onHandleMinusToBasket = () => {
    if (countToBasket > 0) {
      setCountToBasket(countToBasket - multiplicity);
      onHandleAddOrRemoveSellerData(countToBasket - multiplicity);
    }
  };

  return (
    <DynamicModuleLoader
      reducers={reducers}
    >
      <div className={cls.count}>
        <Button
          variant="comparate_button"
          disabled={isShow}
          size="xs"
          fullWidth
          onClick={onHandleMinusToBasket}
        >
          <div className={cls.control_count}>
            <Icon name="minus" size={30}/>
          </div>
        </Button>
        <Input
          type="number"
          value={countToBasket === 0
            ? ""
            : countToBasket}
          onChange={onHandleAddOrRemoveSellerData}
          placeholder="0"
          disabled={isShow}
          className={cls.input_count}
        />
        <Button
          disabled={isShow} 
          variant="comparate_button"
          size="xs"
          fullWidth
          onClick={onHandleAddToBasket}
        >
          <div className={cls.control_count}>
            <Icon name="plus" size={30}/>
          </div>
        </Button>
      </div>
      {/* <div className={cls.price_object}>
               <Typography align="center" variant="h6">
                  {countToBasket !== 0 && `${formattedPrice} / ${nomenclatureData?.measurement}`}                  
               </Typography>
            </div> */}
    </DynamicModuleLoader>
  );
};

export const NomenclatureCountForSeller = React.memo(Component);
