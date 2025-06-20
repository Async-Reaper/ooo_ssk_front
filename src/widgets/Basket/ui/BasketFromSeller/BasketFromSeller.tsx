import { SelectSellerOrder } from "@entities/SellerOrders";
import { getUserAuthData } from "@entities/user";
import { DeleteFromSellerDataButton, deleteFromSellerDataReducer } from "@features/DeleteFromSellerData";
import { fetchGetSellerData, getSellerData, getSellerDataReducer } from "@features/GetSellerData";
import { useAppDispatch } from "@shared/hooks";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import {
  Typography, VStack,
} from "@shared/ui";
import { OrderHeader, orderHeaderReducer } from "@widgets/OrderHeader";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { addToSellerDataReducer } from "@features/AddToSellerData";
import { searchProductActions } from "@features/SearchProduct";
import { getRouteMain } from "@shared/const/router";
import { Substrate } from "@shared/ui/Primitives/Container/Container";
import { BasketProductsListFromSeller } from "../BasketProductsListFromSeller/BasketProductsListFromSeller";

const reducers: ReducersList = {
  getSellerData: getSellerDataReducer,
  deleteFromSellerData: deleteFromSellerDataReducer,
  addToSellerData: addToSellerDataReducer,
  orderHeader: orderHeaderReducer,
};

const Component = () => {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUserAuthData);
  const documentGUID = params.get("documentGUID")?.toString() || null;
  const currentSellerOrder = useSelector(getSellerData);

  useEffect(() => {
    if (documentGUID !== undefined && documentGUID !== null) {
      const paramsRequest = {
        user_guid: user?.userGUID!,
        document_guid: documentGUID,
      };
      dispatch(fetchGetSellerData(paramsRequest));
    }
  }, [dispatch, user, documentGUID]);

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
         
      <VStack gap="16" align="center" justify="center">
        <SelectSellerOrder />
        { currentSellerOrder
          ? (
            <>
              <DeleteFromSellerDataButton 
                SellerOrder={currentSellerOrder!}
              />
              <div onClick={handleRouteMain}>
                <Typography variant="h3">
                  Добавить товары в заказ
                </Typography>
              </div>
              <div className="head">
                {/* <OrderHeader /> */}
              </div>
            </>
          )
          : ""}
        <Substrate>
          <BasketProductsListFromSeller
            basketProductsList={currentSellerOrder?.document_data?.products}
            documentGUID={documentGUID!}
            userGUID={user?.userGUID!}
          />
        </Substrate>
      </VStack>
         
    </DynamicModuleLoader>
  );
};

export const BasketFromSeller = React.memo(Component);
