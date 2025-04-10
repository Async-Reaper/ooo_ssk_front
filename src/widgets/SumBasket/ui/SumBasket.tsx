import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { __API__ } from "../../../shared/protocols/api";
import { sumBasketReducer, getSumBasketOrder, fetchSumBasketByParams } from "..";
import { DynamicModuleLoader, ReducersList } from "../../../shared/libs/component";
import { useAppDispatch } from "../../../shared/hooks";
import cls from "./SumBasket.module.scss";
import { getCurrentTradePoint } from "../../../entities/TradePoint";
import { UserRoles, getUserAuthData } from "../../../entities/user";
import { GetСurrentBasketSum } from "../model/selectors/basketSumSelectors";

const reducers: ReducersList = {
  SumBusket: sumBasketReducer,
};

const Component = (() => {
  const basketSum = useSelector(getSumBasketOrder);
  const dispatch = useAppDispatch();
  const currentTradePoint = useSelector(getCurrentTradePoint);
  const contractGUID = currentTradePoint?.guid! || new URLSearchParams(location.search).get("contract_guid")!;
  const user = useSelector(getUserAuthData);

  useEffect(() => {
    if (user?.userGUID.length && contractGUID?.length) {
      dispatch(fetchSumBasketByParams({ userGuid: user?.userGUID!, contractGuid: contractGUID }));
    }
  }, [dispatch, user, contractGUID]); 

  let formattedNumber = 0;

  if (basketSum !== undefined) {
    formattedNumber = basketSum;
  }
  const currentBasketSum = useSelector(GetСurrentBasketSum); 

  if (user?.role === UserRoles.SELLER) {
    formattedNumber = currentBasketSum !== undefined
      ? currentBasketSum
      : 0; 
  }

  return (
    <DynamicModuleLoader
      reducers={reducers}
    >
      <div className={cls.basket_sum}>

        {`${formattedNumber.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`}
      </div>

    </DynamicModuleLoader>
  );
});

export const SumBasketData = React.memo(Component);
