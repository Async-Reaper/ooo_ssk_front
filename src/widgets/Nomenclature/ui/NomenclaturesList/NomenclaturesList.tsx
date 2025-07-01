import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { favoriteReducer, fetchFavoriteProduct, getFavoriteData } from "@entities/FavoriteProducts";
import { fetchBasketProductWithContract, getBasketData } from "@entities/BasketEntitie";
import { getSearchValue, searchProductReducer } from "@features/SearchProduct";
import { VStack } from "@shared/ui";
import { getCurrentTradePoint } from "@entities/TradePoint";
import { getUserAuthData } from "@entities/user";
import { useAppDispatch } from "@shared/hooks";
import { useSearchParams } from "react-router-dom";
import { Conditions } from "@shared/libs/conditions/conditions";
import { Skeleton } from "@shared/ui/Skeleton";
import { Pagination } from "@shared/ui/Pagination/Pagination";
import { NomenclatureCard } from "../NomenclatureCard/NomenclatureCard";
import {
  getNomenclaturesCount,
  getNomenclaturesList,
  getNomenclaturesListIsLoading,
} from "../../model/selectors/nomenclaturesListSelectors";
import { nomenclaturesListReducer } from "../../model/slice/nomenclaturesListSlice";
import { nomenclatureReducer } from "../../model/slice/nomenclatureSlice";
import { usePlaceholderItems } from "../../model/libs/hooks/usePlaceholderItems";
import { fetchNomenclaturesList } from "../../model/services/fetchNomenclaturesList";
import { NomenclaturesListEmpty } from "../NomenclatureListEmpty/NomenclatureListEmpty";

const reducers: ReducersList = {
  nomenclaturesList: nomenclaturesListReducer,
  nomenclature: nomenclatureReducer,
  search: searchProductReducer,
  favoriteList: favoriteReducer,
  // basketList: basketReducer,
};

const Component = () => {
  const nomenclatures = useSelector(getNomenclaturesList);
  const nomenclaturesCount = useSelector(getNomenclaturesCount);
  const isLoading = useSelector(getNomenclaturesListIsLoading);
  const currentTradePoint = useSelector(getCurrentTradePoint);
  const user = useSelector(getUserAuthData);
  const favoriteList = useSelector(getFavoriteData);
  const basketList = useSelector(getBasketData);
  const searchValue = useSelector(getSearchValue);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
   
  const placeholderItems = usePlaceholderItems(limit);
  const dispatch = useAppDispatch();
  const [search] = useSearchParams();

  const contractGUID = currentTradePoint?.guid! || search.get("contractGUID");
  const brandGUID = search.get("brandGUID");
  const isNew = search.get("isNew");
  const parentGuid = search.get("parentGUID");
  const isOnlyMatrix = search.get("isOnlyMatrix");

  useEffect(() => {
    const paramsForRequest: IFilterNomenclatures = {
      page,
      limit,
      contractGuid: contractGUID as string,
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
    if (isOnlyMatrix !== undefined && isOnlyMatrix !== null && isOnlyMatrix !== "") {
      paramsForRequest.matrixGUID = JSON.parse(localStorage.getItem("matrix") || "");
    }
    dispatch(fetchNomenclaturesList(paramsForRequest));
  }, [dispatch, page, contractGUID, searchValue, brandGUID, parentGuid, isNew, isOnlyMatrix]);

  useEffect(() => {
    dispatch(fetchFavoriteProduct({ userGuid: user?.userGUID!, contractGuid: currentTradePoint?.guid! }));
  }, [dispatch]);

  useEffect(() => {
    if (currentTradePoint) {
      dispatch(fetchBasketProductWithContract({ contractGuid: currentTradePoint.guid, userGuid: user!.userGUID }));
    }
  }, [dispatch, currentTradePoint, user]);
  
  return (
    <DynamicModuleLoader
      reducers={reducers}
    >  
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
            : nomenclatures?.map((nomenclature) => ( 
              <NomenclatureCard 
                key={nomenclature.guid} 
                nomenclature={nomenclature} 
                favoriteList={favoriteList!} 
                basketList={basketList} 
              /> 
            ))} 
        </VStack> 
      </Conditions> 
      <Pagination limit={limit} page={page} setPage={setPage} totalCount={nomenclaturesCount!} /> 
    </DynamicModuleLoader>
  );
};

export const NomenclaturesList = React.memo(Component);
