import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@shared/hooks";
import { getUserisLoading, getUserAuthData } from "@entities/user";
import { getOrdersProductsData, getOrdersProductsIsLoading } from "@features/OrderProducts";
import { getOrdersHeaderIsLoading, getOrderHeaderData, orderHeaderReducer } from "@widgets/OrderHeader";
import { fetchGetSellerData } from "@features/GetSellerData/model/services/fetchGetSellerData";
import { fetchOrderProductList } from "@features/OrderProducts/model/services/fetchOrderProductList";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { getSellerDataReducer } from "@features/GetSellerData/model/slice/getSellerDataSlice";
import { orderProductListReducer } from "@features/OrderProducts/model/slice/orderProductListSlice";
import cls from "@features/OrderProducts/ui/OrderProductsList/OrderProductsList.module.scss";
import { IGetSellerData } from "@features/GetSellerData/model/types/getSellerData";
import { fetchOrderHeader } from "@widgets/OrderHeader/model/services/fetchOrderHeader";
import { VStack } from "@shared/ui";
import { NomenclatureCardForSeller } from "@widgets/Nomenclature";
import { fetchAddToSellerData } from "../../model/services/fetchAddToSellerData";

const reducers: ReducersList = {
  orderProductList: orderProductListReducer,
  getSellerData: getSellerDataReducer,
  orderHeader: orderHeaderReducer,
};

const Component = () => {
  const dispatch = useAppDispatch();
  const httpQuery = new URLSearchParams(location.search);
  // date
  const orderHeaderData = useSelector(getOrderHeaderData);
  const ordersProductsData = useSelector(getOrdersProductsData);
  const userInfo = useSelector(getUserAuthData);
  // is load
  const IsLoadingHeader = useSelector(getOrdersHeaderIsLoading);
  const IsLoadingProducts = useSelector(getOrdersProductsIsLoading);
  const IsLoadingUser = useSelector(getUserisLoading);
   
  const documentGUID = httpQuery.get("documentGUID")! || orderHeaderData!.documentGUID;
  useEffect(() => {
    if (documentGUID?.length) {
      dispatch(fetchOrderHeader(documentGUID));
    }
  }, [dispatch, documentGUID]);

  useEffect(() => {
    dispatch(fetchOrderProductList(documentGUID));
  }, [dispatch, documentGUID]);

  useEffect(() => {
    if (IsLoadingHeader === false && IsLoadingProducts === false && IsLoadingUser === false) {
      const loadStateToDB : IGetSellerData = {
        document_guid: documentGUID,
        user_guid: userInfo!.userGUID,
        document_data: {
          document_header: orderHeaderData,
          products: ordersProductsData,
        },
      };
      const getInitStatusOrder = {
        document_guid: documentGUID,
        user_guid: userInfo!.userGUID,
      };

      const sendRequests = async () => {
        const responseInfo = await dispatch(fetchGetSellerData(getInitStatusOrder));
        if (responseInfo.payload === null) {
          await dispatch(fetchAddToSellerData(loadStateToDB));
        }
      };
      sendRequests();
    }
  }, [dispatch, orderHeaderData, ordersProductsData, userInfo, IsLoadingHeader, IsLoadingProducts, IsLoadingUser]);

  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={reducers}
    >
      <VStack className={cls.product____wrapper} gap="8" align="center">
        {ordersProductsData?.map((ordersProduct) => (
          <NomenclatureCardForSeller
            userGUID={userInfo?.userGUID}
            key={ordersProduct.product_guid}
            count={ordersProduct.count}
            documentGUID={documentGUID}
            price={ordersProduct?.amount!}
            isWithGuid
            guid={ordersProduct.product_guid}
            isShow
          />
        ))}
      </VStack>
      {" "}
    </DynamicModuleLoader>
         
  );
};

export const OpenOrder = React.memo(Component);
