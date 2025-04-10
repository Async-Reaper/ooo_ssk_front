import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import cls from "./OrderProductsList.module.scss";
import { NomenclatureCardForSeller } from "../../../../widgets/Nomenclature";
import { Conditions } from "../../../../shared/libs/conditions/conditions";
import { DynamicModuleLoader, ReducersList } from "../../../../shared/libs/component";
import { useAppDispatch } from "../../../../shared/hooks";
import { VStack } from "../../../../shared/ui";
import {
  fetchOrderProductList,
} from "../../model/services/fetchOrderProductList";
import {
  getOrdersProductsData,
} from "../../model/selectors/orderProductsListSelectors";
import { orderProductListReducer } from "../../model/slice/orderProductListSlice";
import { getOrderHeaderData } from "../../../../widgets/OrderHeader";
import { getUserAuthData } from "../../../../entities/user";

const reducers: ReducersList = {
  orderProductList: orderProductListReducer,
};

const Component = () => {
  const ordersProductsData = useSelector(getOrdersProductsData);
  const orderHeader = useSelector(getOrderHeaderData);
  const user = useSelector(getUserAuthData);
  const dispatch = useAppDispatch();
  const params = useParams<{id: string}>();

  useEffect(() => {
    dispatch(fetchOrderProductList(params.id!));
  }, [dispatch, params]);

  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={reducers}
    >
      <Conditions condition={ordersProductsData?.length}>
        <VStack className={cls.product____wrapper} gap="8" align="center">
          {ordersProductsData?.map((ordersProduct) => (
                  
            <NomenclatureCardForSeller
              documentGUID={orderHeader?.documentGUID}
              userGUID={user?.userGUID}
              key={ordersProduct.product_guid}
              price={ordersProduct.price}
              count={ordersProduct.count}
              isWithGuid
              guid={ordersProduct.product_guid}
            />
          ))}
        </VStack>
      </Conditions>
    </DynamicModuleLoader>
         
  );
};

export const OrderProductsList = React.memo(Component);
