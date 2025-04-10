import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserAuthData } from "../../../../entities/user";
import { useAppDispatch } from "../../../../shared/hooks";
import { DynamicModuleLoader, ReducersList } from "../../../../shared/libs/component";
import { BasketProductsListFromSeller } from "../BasketProductsListFromSeller/BasketProductsListFromSeller";
import { fetchGetSellerData } from "../../../../features/GetSellerData/model/services/fetchGetSellerData";
import { getSellerDataReducer } from "../../../../features/GetSellerData/model/slice/getSellerDataSlice";
import { OrderHeader } from "../../../../widgets/OrderHeader";
import { Button, Typography, VStack } from "../../../../shared/ui";
import { SelectSellerOrder, getCurrentSellerOrders } from "../../../../entities/SellerOrders";
import { DeleteFromSellerDataButton } from "../../../../features/DeleteFromSellerData/ui/DeleteFromSellerData/DeleteFromSellerData";
import { deleteFromSellerDataReducer } from "../../../../features/DeleteFromSellerData/model/slice/deleteFromSellerDataSlice";
import { Substrate } from "../../../../shared/ui/Primitives/Container/Container";
import { searchProductActions } from "../../../../features/SearchProduct";
import { getRouteMain } from "../../../../shared/const/router";
import { addToSellerDataReducer } from "../../../../features/AddToSellerData";

const reducers: ReducersList = {
  getSellerData: getSellerDataReducer,
  deleteFromSellerData: deleteFromSellerDataReducer,
  addToSellerData: addToSellerDataReducer,
};

const Component = () => {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUserAuthData);
  const documentGUID = params.get("documentGUID")?.toString() || null;
  const currentSellerOrder = useSelector(getCurrentSellerOrders);

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
        { currentSellerOrder !== undefined && currentSellerOrder !== null
          ? (
            <>
              <DeleteFromSellerDataButton 
                SellerOrder={currentSellerOrder!}
              />
              <Button onClick={handleRouteMain}>
                <Typography variant="h4">
                  Добавить товары в заказ
                </Typography>
              </Button>
              <OrderHeader />
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
