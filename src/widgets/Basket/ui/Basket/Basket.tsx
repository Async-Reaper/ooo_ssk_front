import React, {
  useCallback, useEffect, useMemo, useState, 
} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserAuthData } from "@entities/user";
import { getCurrentTradePoint } from "@entities/TradePoint";
import { CreateOrderButton, createOrderReducer, getCreateOrderIsLoading } from "@features/CreateOrder";
import { favoriteReducer, fetchFavoriteProduct, getFavoriteData } from "@entities/FavoriteProducts";
import { useAppDispatch } from "@shared/hooks";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import {
  basketReducer, fetchBasketProductWithContract, getBasketData, getBasketIsLoading, 
} from "@entities/BasketEntitie";
import { Input, Loader, Typography } from "@shared/ui";
import { DeleteFromBasketAllProducts } from "@features/DeleteFromBasket";
import { getSumBasketOrder } from "@widgets/SumBasket";
import { getRouteMain } from "@shared/const/router";
import { searchProductActions } from "@features/SearchProduct";
import cls from "./Basket.module.scss";
import { BasketProductsList } from "../BasketProductsList/BasketProductsList";

const reducers: ReducersList = {
  createOrderForm: createOrderReducer,
  basketList: basketReducer,
  favoriteList: favoriteReducer,
};

const Component = () => {
  const currentTradePoint = useSelector(getCurrentTradePoint);
  const favoriteProductsList = useSelector(getFavoriteData);
  const basketProducts = useSelector(getBasketData);
  const basketProductsIsLoading = useSelector(getBasketIsLoading);
  const user = useSelector(getUserAuthData);
  const basketSum = useSelector(getSumBasketOrder);
  const createOrderIsLoading = useSelector(getCreateOrderIsLoading);

  const formattedNumber: string = basketSum !== undefined
    ? basketSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    : "0";

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  
  const handleCommentChange = (event:string) => {
    setComment(event);
  };

  const getCurrentDate = (appendDay : number = 0) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + appendDay);
    return currentDate.toLocaleDateString().split(".").reverse().join("-");
  };

  const [currentDate, setCurrentDate] = useState(getCurrentDate(1));

  const handleShipmentChange = (event:string) => {
    setCurrentDate(event);
  };

  useEffect(() => {
    if (currentTradePoint) {
      dispatch(fetchBasketProductWithContract({ userGuid: user!.userGUID, contractGuid: currentTradePoint.guid }));
    }
  }, [user, currentTradePoint]);

  useEffect(() => {
    dispatch(fetchFavoriteProduct({ userGuid: user?.userGUID!, contractGuid: currentTradePoint?.guid! }));
  }, [dispatch, user]);
   
  const convertDate = useCallback(() => {
    const date = new Date(currentDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
    const year = date.getFullYear();

    const hours = String(date.getHours() + 1).padStart(2, "0"); // Добавляем +1 час к часам
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`; 
  }, [currentDate]);

  const productsForCreateOrder: any = useMemo(() => basketProducts?.map((basketItem) => ({
    product_guid: basketItem?.product_guid,
    count: basketItem?.count,
  })), [basketProducts]);
   
  const dataCreateOrder: any = useMemo(() => ({
    header: {
      userGUID: user?.userGUID,
      contractGUID: currentTradePoint?.guid,
      dateshipment: convertDate(),
      comment,
    },
    products: productsForCreateOrder,
  }), [user, currentTradePoint, convertDate, productsForCreateOrder, basketSum, comment]);

  const handleRouteMain = () => {
    const httpQuery = new URLSearchParams(location.search);
    httpQuery.delete("parentGUID");
    httpQuery.delete("brandGUID");
    searchProductActions.setSearchValue("");
    navigate({
      pathname: getRouteMain(),
      search: `${httpQuery}`,
    });
  };

  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={reducers}
    >
      <div className={cls.basket__wrapper}>
        {basketProducts?.length! > 0 && (
          <div className={cls.button__continue__order} onClick={handleRouteMain}>
            <Typography variant="h3">
              Продолжить наполнение заказа
            </Typography>
          </div>
        )}
        <Typography variant="h4" bold align="center">
          Корзина:
          {" "}
          {`${formattedNumber} ₽`}
        </Typography>
        <div className={cls.basket__list__wrapper}>
          <DeleteFromBasketAllProducts
            basketProductsList={basketProducts!}
          />
          <input
            className={cls.input_date}
            id="dateShipment"
            type="date"
            value={currentDate}
            min={getCurrentDate()}
            onChange={(e) => handleShipmentChange(e.target.value)}
          />
          {
            (createOrderIsLoading || basketProductsIsLoading)
              ? <Loader />
              : (
                <BasketProductsList
                  basketProductsList={basketProducts!}
                  favoriteProductsList={favoriteProductsList!}
                />
              )
          }
        </div>
        <Input value={comment} placeholder="Комментарий" onChange={handleCommentChange} className={cls.commentary} />
        <CreateOrderButton dataCreateOrder={dataCreateOrder} />
      </div>
    </DynamicModuleLoader>
  );
};

export const Basket = React.memo(Component);
