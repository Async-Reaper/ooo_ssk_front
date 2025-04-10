import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppImage, Button, Input } from "../../../../shared/ui";

import { getCurrentTradePoint } from "../../../../entities/TradePoint";
import { IBasket } from "../../../../entities/BasketEntitie";
import { UserDataType } from "../../../../entities/user";
import { useAppDispatch } from "../../../../shared/hooks";
import { addToBasketActions, fetchAddToBasket } from "../../../../features/AddToBasket";
import { deleteFromBasketActions, fetchDeleteFromBasket } from "../../../../features/DeleteFromBasket";
import { INomenclature } from "../../model/types/nomenclature";
import cls from "./NomenclatureCount.module.scss";
import { useAlertsInfo } from "../../model/libs/hooks/useAlertsInfo";
import { IAlert } from "../../../../entities/Alerts";
import { fetchSumBasketByParams } from "../../../../widgets/SumBasket";

interface NomenclatureCountProps {
  countValue?: number;
  user: UserDataType;
  basketList: IBasket[];
  nomenclatureData: INomenclature;
}

const Component = ({
  user, basketList, nomenclatureData, countValue, 
}: NomenclatureCountProps) => {
  const currentTradePoint = useSelector(getCurrentTradePoint);
  const dispatch = useAppDispatch();
  const alert = useAlertsInfo();

  // const price = nomenclatureData?.additional_information === undefined
  //    ? 0
  //    : nomenclatureData?.additional_information.price;

  // const formattedPrice: string = price !== undefined
  //    ? `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`
  //    : "0 ₽";

  const [countToBasket, setCountToBasket] = useState(countValue || 0);
  const { remains } = nomenclatureData?.additional_information || 0;
  const multiplicity = nomenclatureData?.multiplicity === 0
    ? 1
    : nomenclatureData?.multiplicity;

  const detectCorrectCount = (count: number) => {
    const alertBox : IAlert = {
      id: 1,
      type: "error",
      title: "Не удалось изменить количество!",
      text: "",
    };
         
    if (count > remains) {
      alertBox.text = "Не хватает товара на складе. \n Установлено максимальное значение";
      alert.onOpenAlert(alertBox);
      setCountToBasket(remains);
      return true;
    }
    return false;
  };

  const onHandleFetchToBasket = useCallback(async (count:number) => {
    // validate
    const isNotCorrectCount = detectCorrectCount(count);
    if (isNotCorrectCount) {
      count = remains;
    }
    // change
    if (count > 0) {
      await dispatch(fetchAddToBasket({
        product_guid: nomenclatureData!.guid,
        user_guid: user!.userGUID,
        contract_guid: currentTradePoint!.guid,
        count,
      }));
      dispatch(addToBasketActions.addToBasket({
        product_guid: nomenclatureData!.guid,
        user_guid: user!.userGUID,
        contract_guid: currentTradePoint!.guid,
        count,
      }));
    } else {
      await dispatch(fetchDeleteFromBasket({
        productGuid: nomenclatureData.guid,
        userGuid: user!.userGUID,
        contractGuid: currentTradePoint!.guid,
      }));
      dispatch(deleteFromBasketActions.deleteFromBasket(nomenclatureData.guid));
    }
    dispatch(fetchSumBasketByParams({ userGuid: user!.userGUID, contractGuid: currentTradePoint?.guid! }));
  }, [dispatch, nomenclatureData, currentTradePoint, countToBasket, user]);

  const onHandleAddToBasket = useCallback(async () => {
    const count = countToBasket + multiplicity;
    setCountToBasket(count);
    onHandleFetchToBasket(count);
  }, [countToBasket, setCountToBasket, onHandleFetchToBasket]);

  const onHandleMinusToBasket = useCallback(() => {
    const count = countToBasket - multiplicity;
    setCountToBasket(count);
    onHandleFetchToBasket(count);
  }, [countToBasket, setCountToBasket, onHandleFetchToBasket]);

  const onHandleInputCount = (value: number) => {
    setCountToBasket(Number(value)); 
    onHandleFetchToBasket(Number(value));
  };

  useEffect(() => {
    basketList?.map((basket) => (basket.product_guid === nomenclatureData?.guid)
            && setCountToBasket(basket.count));
  }, [basketList, nomenclatureData, setCountToBasket]);
  return (  

    <div>
      <div className={cls.count}>
        <Button
          variant="comparate_button"
          disabled={countToBasket === 0 || !currentTradePoint?.guid}
          size="xs"
          fullWidth
          onClick={onHandleMinusToBasket}
        >
          <div className={cls.control_count}>
            <AppImage src="/common/minus.svg" />
          </div>
        </Button>

        <Input
          type="number" 
          value={countToBasket === 0
            ? ""
            : countToBasket}
          onChange={onHandleInputCount}
          className={cls.input_count}
          placeholder="0"
        />
            
        <Button
          variant="comparate_button" 
          disabled={!currentTradePoint?.guid}
          size="xs"
          fullWidth
          onClick={onHandleAddToBasket}
        >
          <div className={cls.control_count}>
            <AppImage src="/common/plus.svg" />
          </div>
        </Button>
         
      </div>

      {/* <div className={cls.price_object}>
            <Typography align="center" variant="h6">
               {countToBasket !== 0 && `${formattedPrice} / ${nomenclatureData?.measurement}`}                  
            </Typography>
         </div> */}
    </div>

  );
};

export const NomenclatureCount = React.memo(Component);
