import { getUserAuthData, getUserisLoading } from "@entities/user";
import { fetchAddToSellerData } from "@features/AddToSellerData";
import { getApprovedOrderIsLoading } from "@features/ApprovedOrder";
import {
  fetchGetSellerData,
  getSellerDataReducer, IGetSellerData,
} from "@features/GetSellerData";
import { useAppDispatch } from "@shared/hooks";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { Loader, VStack } from "@shared/ui";
import { NomenclatureCardForSeller } from "@widgets/Nomenclature";
import { getOrderHeaderData, getOrdersHeaderIsLoading, orderHeaderReducer } from "@widgets/OrderHeader";
import { fetchOrderHeader } from "@widgets/OrderHeader/model/services/fetchOrderHeader";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getOrdersProductsData,
  getOrdersProductsIsLoading,
} from "../../model/selectors/orderProductsListSelectors";
import {
  fetchOrderProductList,
} from "../../model/services/fetchOrderProductList";
import { orderProductListReducer } from "../../model/slice/orderProductListSlice";
import cls from "./OrderProductsList.module.scss";

const reducers: ReducersList = {
  orderProductList: orderProductListReducer,
  getSellerData: getSellerDataReducer,
  orderHeader: orderHeaderReducer,
};

const Component = () => {
  const ordersProductsData = useSelector(getOrdersProductsData);
  const ordersProductsIsLoading = useSelector(getOrdersProductsIsLoading);
  const orderHeader = useSelector(getOrderHeaderData);
  const approvedOrderIsLoading = useSelector(getApprovedOrderIsLoading);
  const user = useSelector(getUserAuthData);
  const dispatch = useAppDispatch();
  const params = useParams<{id: string}>();

  const httpQuery = new URLSearchParams(location.search);
  // date
  const orderHeaderData = useSelector(getOrderHeaderData);

  const userInfo = useSelector(getUserAuthData);
  // is load
  const isLoadingHeader = useSelector(getOrdersHeaderIsLoading);
  const isLoadingProducts = useSelector(getOrdersProductsIsLoading);
  const isLoadingUser = useSelector(getUserisLoading);
     
  const documentGUID = httpQuery.get("documentGUID")! || orderHeaderData!.documentGUID;
  
  useEffect(() => {
    if (documentGUID) {
      dispatch(fetchOrderHeader(documentGUID));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchOrderProductList(params.id!));
  }, [dispatch, params]);
  
  const sendRequests = useCallback(async () => {
    if (!isLoadingHeader && !isLoadingProducts && !isLoadingUser) {
      const responseInfo = await dispatch(fetchGetSellerData({
        document_guid: documentGUID,
        user_guid: userInfo!.userGUID,
      }));
  
      const loadStateToDB: IGetSellerData = {
        document_guid: documentGUID,
        user_guid: userInfo!.userGUID,
        document_data: {
          document_header: orderHeaderData,
          products: ordersProductsData,
        },
      };
      // console.log);
      if (responseInfo.payload === null && orderHeaderData && ordersProductsData) {
        await dispatch(fetchAddToSellerData(loadStateToDB)); 
        await dispatch(fetchGetSellerData({
          document_guid: documentGUID,
          user_guid: userInfo!.userGUID,
        }));
      }
    }
  }, [dispatch, documentGUID, userInfo, orderHeaderData, ordersProductsData, isLoadingHeader, isLoadingProducts, isLoadingUser]);

  useEffect(() => {
    sendRequests();
  }, [sendRequests]);

  // console.log(orderHeaderData, ordersProductsData, sellerData);
  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={reducers}
    >
      <VStack className={cls.product____wrapper} gap="8" align="center">
        {
          (ordersProductsIsLoading || approvedOrderIsLoading) 
            ? <Loader />
            // : sellerData?.document_data.products?.map((ordersProduct) => (
            //   <NomenclatureCardForSeller
            //     documentGUID={orderHeader?.documentGUID}
            //     userGUID={user?.userGUID}
            //     key={ordersProduct.product_guid}
            //     price={ordersProduct.price}
            //     count={ordersProduct.count}
            //     isWithGuid
            //     guid={ordersProduct.product_guid}
            //   />
            // ))
            : ordersProductsData?.map((ordersProduct) => (
              <NomenclatureCardForSeller
                documentGUID={orderHeader?.documentGUID}
                userGUID={user?.userGUID}
                key={ordersProduct.product_guid}
                price={ordersProduct.price}
                count={ordersProduct.count}
                isWithGuid
                guid={ordersProduct.product_guid}
              />
            ))
        }
      </VStack>
    </DynamicModuleLoader>
  );
};

export const OrderProductsList = React.memo(Component);
