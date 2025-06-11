import { favoriteReducer, fetchFavoriteProduct, getFavoriteData } from "@entities/FavoriteProducts";
import { getCurrentTradePoint } from "@entities/TradePoint";
import { getUserAuthData } from "@entities/user";
import { useAppDispatch } from "@shared/hooks";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { Conditions } from "@shared/libs/conditions/conditions";
import { VStack } from "@shared/ui";
import { NomenclatureCard } from "@widgets/Nomenclature";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { basketReducer } from "@entities/BasketEntitie";
import {
  getOrdersHistoryProductsData,
} from "../../model/selectors/orderProductsHistoryListSelectors";
import {
  fetchOrderProductHistoryList,
} from "../../model/services/fetchOrderProductHistoryList";
import { orderProductHistoryListReducer } from "../../model/slice/orderProductHistoryListSlice";
import cls from "./OrderProductsHistoryList.module.scss";

const reducers: ReducersList = {
  orderProductHistoryList: orderProductHistoryListReducer,
  basketList: basketReducer,
  favoriteList: favoriteReducer,
};

const Component = () => {
  const ordersProductsHistoryData = useSelector(getOrdersHistoryProductsData);
  const user = useSelector(getUserAuthData);
  const favoriteProductsList = useSelector(getFavoriteData);
  const tradePoint = useSelector(getCurrentTradePoint);
  const dispatch = useAppDispatch();
  const params = useParams<{id: string}>();
  const [search] = useSearchParams();
  
  useEffect(() => {
    dispatch(fetchOrderProductHistoryList(params.id!));
  }, [dispatch, params]);

  useEffect(() => {
    dispatch(fetchFavoriteProduct({ userGuid: user?.userGUID!, contractGuid: tradePoint?.guid! || search.get("contractGUID") }));
  }, [dispatch, user]);

  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={reducers}
    >
      <Conditions condition={ordersProductsHistoryData?.length}>
        <VStack className={cls.product__history__wrapper} gap="8" align="center">
          {ordersProductsHistoryData?.map((ordersProduct) => (
                  
            <NomenclatureCard
              key={ordersProduct.product_guid}
              count={ordersProduct.count}
              isWithGuid
              guid={ordersProduct.product_guid}
              favoriteList={favoriteProductsList}
            />
          ))}
        </VStack>
      </Conditions>
    </DynamicModuleLoader>
         
  );
};

export const OrderProductsHistoryList = React.memo(Component);
