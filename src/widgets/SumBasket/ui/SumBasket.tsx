import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { __API__ } from "@shared/protocols/api";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { useAppDispatch } from "@shared/hooks";
import { getCurrentTradePoint } from "@entities/TradePoint";
import { UserRoles, getUserAuthData } from "@entities/user";
import { sellerDataReducer } from "@entities/SellerOrders";
import { getSellerData } from "@features/GetSellerData";
import { getCurrentBasketSum, getSumBasketOrder } from "../model/selectors/basketSumSelectors";
import { fetchSumBasketByParams } from "../model/services/fetchSumBasket";
import { sumBasketReducer } from "../model/slice/sumBasketSlice";
import cls from "./SumBasket.module.scss";

const reducers: ReducersList = {
  SumBusket: sumBasketReducer,
  sellerOrders: sellerDataReducer, 
};

const Component = (() => {
  const basketSum = useSelector(getSumBasketOrder);
  const currentTradePoint = useSelector(getCurrentTradePoint);
  const sellerData = useSelector(getSellerData);
  const user = useSelector(getUserAuthData);
  const currentBasketSum = useSelector(getCurrentBasketSum); 
  const contractGUID = currentTradePoint?.guid! || new URLSearchParams(location.search).get("contract_guid")!;
  const dispatch = useAppDispatch();
  const [formattedNumber, setFormatedNumber] = useState(0);
  
  useEffect(() => {
    if (user?.userGUID.length && contractGUID?.length) {
      dispatch(fetchSumBasketByParams({ userGuid: user?.userGUID!, contractGuid: contractGUID }));
    }
  }, [dispatch, user, contractGUID]); 

  useEffect(() => {
    if (basketSum) {
      setFormatedNumber(basketSum);
    }
  }, [basketSum]);

  useEffect(() => {
    if (user?.role === UserRoles.SELLER && currentBasketSum) {
      setFormatedNumber(currentBasketSum);
    } else if (user?.role === UserRoles.SELLER && !currentBasketSum && sellerData?.document_data.products) {
      setFormatedNumber(sellerData?.document_data.products?.reduce((total: number, product: { price: number; count: number; }) => total += product.price * product.count, 0));
    }
  }, [user, currentBasketSum, sellerData]);

  return (
    <DynamicModuleLoader
      reducers={reducers}
    >
      <div className={cls.basket_sum}>
        {user?.role === UserRoles.SELLER && `${formattedNumber?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`}
        {(user?.role === UserRoles.BUYER && basketSum)
          ? `${basketSum?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`
          : (user?.role === UserRoles.BUYER && basketSum) && "0 ₽"}
      </div>

    </DynamicModuleLoader>
  );
});

export const SumBasketData = React.memo(Component);
