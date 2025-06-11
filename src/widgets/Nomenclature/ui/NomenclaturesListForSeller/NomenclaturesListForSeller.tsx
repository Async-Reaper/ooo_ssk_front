import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "@shared/hooks";
import { Skeleton } from "@shared/ui/Skeleton";
import { VStack } from "@shared/ui";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { getUserAuthData } from "@entities/user";
import { Pagination } from "@shared/ui/Pagination/Pagination";
import { getSearchValue } from "@features/SearchProduct";
import {
  getSellerData, getSellerDataIsLoading, fetchGetSellerData, getSellerDataReducer, 
} from "@features/GetSellerData";

import { getCurrentSellerOrders } from "@entities/SellerOrders";
import { Conditions } from "@shared/libs/conditions/conditions";
import { selectSumBasketActions, selectSumBasketReducer } from "@widgets/SumBasket";
import { usePlaceholderItems } from "../../model/libs/hooks/usePlaceholderItems";
import { NomenclatureCardForSeller } from "../NomenclatureCardForSeller/NomenclatureCardForSeller";
import {
  getNomenclaturesCount,
  getNomenclaturesList,
  getNomenclaturesListIsLoading,
} from "../../model/selectors/nomenclaturesListSelectors";
import { fetchNomenclaturesList } from "../../model/services/fetchNomenclaturesList";
import { nomenclaturesListReducer } from "../../model/slice/nomenclaturesListSlice";
import { NomenclaturesListEmpty } from "../NomenclatureListEmpty/NomenclatureListEmpty";

const reducers: ReducersList = {
  nomenclaturesList: nomenclaturesListReducer,
  getSellerData: getSellerDataReducer,
  CurrentSumBusket: selectSumBasketReducer,
};

const Component = () => {
  const nomenclatures = useSelector(getNomenclaturesList);
  const orderProductsInfo = useSelector(getSellerData);
  const orderProductIsLoading = useSelector(getSellerDataIsLoading);
  const nomenclaturesCount = useSelector(getNomenclaturesCount);
  const isLoading = useSelector(getNomenclaturesListIsLoading);
  const user = useSelector(getUserAuthData);
  const searchValue = useSelector(getSearchValue);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const placeholderItems = usePlaceholderItems(limit);
  const dispatch = useAppDispatch();
  const [search] = useSearchParams();

  const userGUID = user?.userGUID;
   
  const currentDocument = useSelector(getCurrentSellerOrders);
  const documentGUID = currentDocument?.document_guid || search.get("documentGUID")?.toString();
  const contractGUID = currentDocument?.document_data.document_header?.contractGUID || search.get("contractGUID")?.toString();
   
  const brandGUID = search.get("brandGUID");
  const isNew = search.get("isNew");
  const parentGuid = search.get("parentGUID");

  const paramsForRequest: IFilterNomenclatures = {
    page,
    limit,
    contractGuid: contractGUID?.toString(),
  };
    
  if (brandGUID !== undefined && brandGUID !== null && brandGUID !== "") {
    paramsForRequest.brandGuid = brandGUID;
  } else if (parentGuid !== undefined && parentGuid !== null && parentGuid !== "") {
    paramsForRequest.parentGuid = parentGuid;
  }
  if (isNew !== undefined && isNew !== null && isNew !== "") {
    paramsForRequest.isNew = Boolean(isNew);
  }
  if (searchValue !== undefined && searchValue !== null && searchValue !== "") {
    paramsForRequest.titleProduct = searchValue;
  }
   
  const calculateAmount = (products: any[]) => products.reduce((amount: number, product: any) => amount += ((product.count) * (product.price)), 0);

  useEffect(() => {
    if (currentDocument) {
      const totalSum = calculateAmount(currentDocument?.document_data.products!);
      dispatch(selectSumBasketActions.setSumBasket(totalSum || 0));
    } else
    if (orderProductsInfo) {
      const totalSum = calculateAmount(orderProductsInfo?.document_data.products!);
      dispatch(selectSumBasketActions.setSumBasket(totalSum || 0));
    }
  }, [dispatch, currentDocument, orderProductsInfo]);

  useEffect(() => {
    dispatch(fetchNomenclaturesList(paramsForRequest));
  }, [dispatch, page, contractGUID, searchValue, brandGUID, parentGuid, isNew]);

  useEffect(() => {
    if (!orderProductIsLoading) {
      const paramsForSellerRequest = {
        user_guid: userGUID!,
        document_guid: documentGUID!,
      };
      dispatch(fetchGetSellerData(paramsForSellerRequest));
    }
  }, [dispatch, userGUID, documentGUID]);
   
  return (
    <DynamicModuleLoader
      reducers={reducers}
    >
      {/* <Pagination limit={limit} page={page} setPage={setPage} totalCount={nomenclaturesCount!} /> */}
      <Conditions condition={!nomenclatures?.length}>
        <VStack gap="16" max align="center" justify="center">
          {isLoading 
            ? placeholderItems.map((item) => <Skeleton key={item} width="100%" height="175px" border="15px" />) 
            : <NomenclaturesListEmpty />}
        </VStack>
      </Conditions>
         
      <Conditions condition={nomenclatures?.length}> 
        <VStack gap="16" max align="center" justify="center">
          {isLoading
            ? placeholderItems.map((item) => <Skeleton key={item} width="100%" height="175px" border="15px" />)
            : nomenclatures?.map((nomenclature) => {
              let countBasket = 0;
              let price :number | undefined = 0;
              if (!orderProductIsLoading) {
                const sellerDataThisProduct = orderProductsInfo?.document_data.products?.find(
                  (elem) => elem.product_guid === nomenclature?.guid,
                );
                if (sellerDataThisProduct) {
                  countBasket = sellerDataThisProduct?.count === undefined
                    ? 0
                    : sellerDataThisProduct?.count;
                  price = sellerDataThisProduct?.price;
                }
              }
              return (
                <NomenclatureCardForSeller
                  key={nomenclature.guid}
                  guid={nomenclature.guid}
                  nomenclature={nomenclature}
                  userGUID={userGUID}
                  documentGUID={documentGUID}
                  count={countBasket}
                  price={price}
                />
              );
            })}
        </VStack>
      </Conditions>
      <Pagination limit={limit} page={page} setPage={setPage} totalCount={nomenclaturesCount!} />
    </DynamicModuleLoader>
  );
};

export const NomenclaturesListForSeller = React.memo(Component);
