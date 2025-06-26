import React, {
  useCallback, useEffect, useRef, useState, 
} from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { Skeleton } from "@shared/ui/Skeleton";
import { getUserAuthData } from "@entities/user";
import { useAppDispatch } from "@shared/hooks";
import { Typography } from "@shared/ui";
import { selectSumBasketActions, selectSumBasketReducer } from "@widgets/SumBasket";
import { fetchSellerData } from "../../model/services/fetchSellerOrders";
import { sellerDataActions, sellerDataReducer } from "../../model/slice/sellerOrdersSlice";
import {
  getCurrentSellerOrders,
  getSellerOrdersIsLoading,
  getSellerOrders,
} from "../../model/selectors/sellerOrdersSelectors";
import cls from "./SelectSellerOrders.module.scss";

const reducers: ReducersList = {
  sellerOrders: sellerDataReducer,
  CurrentSumBusket: selectSumBasketReducer,
};

const Component = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLoading = useSelector(getSellerOrdersIsLoading);
  const dispatch = useAppDispatch();
  const currentSellerOrder = useSelector(getCurrentSellerOrders);
  const sellerOrders = useSelector(getSellerOrders);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const userId = useSelector(getUserAuthData);
  const blockRef = useRef<HTMLDivElement>(null);
   
  const onSetIsExpanded = () => {
    setIsExpanded(!isExpanded);
    // setIsExpanded(true);
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchSellerData(userId!.userGUID));
    }
  }, [dispatch, userId, params]);
   
  const handleSetValue = useCallback((id: string) => {
    const newTradePoint = sellerOrders?.filter((item) => item.document_guid === id);
    dispatch(sellerDataActions.changeSellerData(newTradePoint![0]));
    const httpQuery = new URLSearchParams(location.search);
    httpQuery.set("documentGUID", newTradePoint![0].document_guid);
    httpQuery.set("contractGUID", newTradePoint![0].document_data?.document_header?.contractGUID!);
    navigate({
      search: `${httpQuery}`,
    });
    setIsExpanded(false);
  }, [sellerOrders, dispatch, navigate, currentSellerOrder]);

  useEffect(() => {
    sellerOrders?.map((tradePoint) => {
      if (params.get("documentGUID") === tradePoint.document_guid) {
        dispatch(sellerDataActions.changeSellerData(tradePoint));
      }
    });
  }, [sellerOrders, dispatch, params]);

  const calculateAmount = (products: any[]) => products.reduce((amount: number, product: any) => amount += (product.count) * (product.price), 0);

  useEffect(() => {
    if (currentSellerOrder) {
      const totalSum = calculateAmount(currentSellerOrder?.document_data.products!);
      dispatch(selectSumBasketActions.setSumBasket(totalSum || 0));
    }
  }, [dispatch, currentSellerOrder]);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (blockRef.current && !blockRef.current.contains(event.target as Node)) {
  //       setIsExpanded(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={reducers}
    >
      {
        isLoading
          ? <Skeleton width="250px" height="50px" border="10px" />
          : (
            <div className={cls.select__wrapper} >
              <div className={cls.select__default} onClick={onSetIsExpanded} ref={blockRef}>
                {currentSellerOrder
                  ? (
                    <>
                      <Typography variant="h5">
                        Заказ №
                        {currentSellerOrder.document_data.document_header?.number}
                        {" "}
                        от:
                        {" "}
                        {currentSellerOrder.document_data.document_header?.date}
                      </Typography>
                      <Typography variant="h5">
                        Сумма:
                        {" "}
                        {currentSellerOrder.document_data.document_header?.amount?.toFixed(2)}
                        {" ₽"}
                      </Typography>
                    </>
                  )
                  : sellerOrders?.length && "Выберите документ" 
                  || !sellerOrders?.length && "Документов в корзине нету"}
                <div className={isExpanded
                  ? cls.up
                  : cls.down}
                >
                  <Typography align="center" variant="h4">
                    ▼
                  </Typography>
                </div>
              </div>
              <div className={cls.select__list} aria-expanded={isExpanded} >
                {sellerOrders?.map((select) => (
                  <div
                    className={cls.select__item}
                    key={select.document_guid}
                    onClick={() => handleSetValue(select.document_guid)}
                  >
                    <Typography variant="h4">
                      Заказ №
                      {select.document_data.document_header?.number}
                      {" "}
                      от:
                      {" "}
                      {select.document_data.document_header?.date}
                    </Typography>
                    <Typography variant="h4">
                      {" "}
                      Сумма:
                      {select.document_data.document_header?.amount?.toFixed(2)}
                      {" ₽"}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          )
      }
    </DynamicModuleLoader>
  );
};

export const SelectSellerOrder = React.memo(Component);
