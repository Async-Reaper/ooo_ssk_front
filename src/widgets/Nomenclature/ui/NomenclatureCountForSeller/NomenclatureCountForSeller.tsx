import { IAlert } from "@entities/Alerts";
import { fetchAddToSellerData } from "@features/AddToSellerData";
import {
  getSellerData, getSellerDataActions, getSellerDataReducer,
  Product,
} from "@features/GetSellerData";
import { useAppDispatch } from "@shared/hooks";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { Icon } from "@shared/libs/icons";
import {
  Button, Input,
} from "@shared/ui";
import { selectSumBasketReducer } from "@widgets/SumBasket";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

const reducers: ReducersList = {
  getSellerData: getSellerDataReducer,
  CurrentSumBusket: selectSumBasketReducer,
};

const Component = ({
  nomenclatureData, 
  countValue, 
  documentGUID,
  userGUID,
  productGUID,
  isShow,
  price,
}: NomenclatureCountForSellerProps) => {
  const dispatch = useAppDispatch();
  const sellerData = useSelector(getSellerData);

  const calculateAmount = (products: Product[]) => products.reduce((amount: number, product: any) => amount += ((product.count) * (product.price)), 0);
   
  const alert = useAlertsInfo();
  let priceConfirm = 0;

  if (price !== undefined && price !== null && price !== 0) {
    priceConfirm = price;
  } 

  if (
    priceConfirm === 0 
      && nomenclatureData?.additional_information !== undefined
      && nomenclatureData?.additional_information !== null
  ) {
    priceConfirm = nomenclatureData?.additional_information.price;
  }

  const [countToBasket, setCountToBasket] = useState(countValue || 0);
  const multiplicity = nomenclatureData?.multiplicity === 0
    ? 1
    : nomenclatureData?.multiplicity;
  const thisGUID = productGUID || nomenclatureData?.guid;

  let remains = (nomenclatureData === undefined || nomenclatureData.additional_information === null)
    ? 0
    : nomenclatureData.additional_information.remains;

  useEffect(() => {
    if (remains === 0) {
      remains = countValue || 0;
    }
  }, [remains, countValue]);

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
  
    if (sellerData?.document_data.document_header && sellerData?.document_data.products) {
      const dataBasket = {
        ...sellerData,
        document_data: {
          ...sellerData.document_data,
          document_header: {
            ...sellerData.document_data?.document_header,
            approved: false,
          },
        },
      };

      if (elem <= 0) {
        const updatedProducts = dataBasket.document_data.products?.filter(
          (item: { product_guid: any; }) => item.product_guid !== thisGUID,
        );

        dataBasket.document_data = {
          ...dataBasket.document_data,
          products: updatedProducts,
        };

        dispatch(getSellerDataActions.freshView(dataBasket.document_data.products!));
      } else {
        const documentDataCopy = { ...dataBasket.document_data };
        
        const newProducts = [...documentDataCopy.products!];

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
            product_guid: nomenclatureData!.guid,
            count: elem,
            price: priceConfirm,
          });
        }
         
        documentDataCopy.products = newProducts;
        dataBasket.document_data = documentDataCopy;
        dispatch(getSellerDataActions.freshView(dataBasket.document_data.products!));
      }
    
      const newAmount = calculateAmount(dataBasket.document_data.products!);
    
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
  }, [dispatch, sellerData, getSellerDataActions, nomenclatureData, setCountToBasket, userGUID, documentGUID, countToBasket]);
   
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
    </DynamicModuleLoader>
  );
};

export const NomenclatureCountForSeller = React.memo(Component);
