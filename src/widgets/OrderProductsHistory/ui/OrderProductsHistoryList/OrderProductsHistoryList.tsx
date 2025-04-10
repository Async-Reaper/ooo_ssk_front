import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import cls from "./OrderProductsHistoryList.module.scss";
import { NomenclatureCard } from "../../../../widgets/Nomenclature";
import { Conditions } from "../../../../shared/libs/conditions/conditions";
import { DynamicModuleLoader, ReducersList } from "../../../../shared/libs/component";
import { favoriteReducer, fetchFavoriteProduct, getFavoriteData } from "../../../../entities/FavoriteProducts";
import { useAppDispatch } from "../../../../shared/hooks";
import { getUserAuthData } from "../../../../entities/user";
import { VStack } from "../../../../shared/ui";
import {
  fetchOrderProductHistoryList,
} from "../../model/services/fetchOrderProductHistoryList";
import {
  getOrdersHistoryProductsData,
} from "../../model/selectors/orderProductsHistoryListSelectors";
import { orderProductHistoryListReducer } from "../../model/slice/orderProductHistoryListSlice";
import { getCurrentTradePoint } from "../../../../../src/entities/TradePoint";

const reducers: ReducersList = {
  orderProductHistoryList: orderProductHistoryListReducer,
  favoriteList: favoriteReducer,
};

const Component = () => {
  const ordersProductsHistoryData = useSelector(getOrdersHistoryProductsData);
  const user = useSelector(getUserAuthData);
  const favoriteProductsList = useSelector(getFavoriteData);
  const tradePoint = useSelector(getCurrentTradePoint);
  const dispatch = useAppDispatch();
  const params = useParams<{id: string}>();

  useEffect(() => {
    dispatch(fetchOrderProductHistoryList(params.id!));
  }, [dispatch, params]);

  useEffect(() => {
    dispatch(fetchFavoriteProduct({ userGuid: user?.userGUID!, contractGuid: tradePoint?.guid! }));
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
