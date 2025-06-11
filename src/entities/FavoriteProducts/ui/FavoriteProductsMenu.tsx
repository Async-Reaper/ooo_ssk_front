import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@entities/user";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { useAppDispatch } from "@shared/hooks";
import { getCurrentTradePoint } from "@entities/TradePoint";
import { favoriteReducer } from "@entities/FavoriteProducts";
import { NomenclatureCard } from "@widgets/Nomenclature";
import { sumBasketReducer } from "@widgets/SumBasket";
import { deleteFromFavoriteReducer } from "@features/DeleteFromFavorite";
import { Typography, VStack } from "@shared/ui";
import { Substrate } from "@shared/ui/Primitives/Container/Container";
import {
  fetchBasketProductWithContract, getBasketData, getBasketIsLoading, 
} from "@entities/BasketEntitie";
import { getFavoriteData, getFavoriteIsLoading } from "../model/selectors/favoriteSelectors";
import { fetchFavoriteProduct } from "../model/services/fetchFavoriteProduct";
import cls from "./FavoriteProductsMenu.module.scss";

const reducers: ReducersList = {
  favoriteList: favoriteReducer,
  // basketList: basketReducer,
  SumBusket: sumBasketReducer,
  deleteFromFavoriteForm: deleteFromFavoriteReducer,
};

const Component = (() => {
  const dispatch = useAppDispatch();
   
  const userInfo = useSelector(getUserAuthData);
  const curentContract = useSelector(getCurrentTradePoint);
   
  const basketProductsList = useSelector(getBasketData);
  const basketProductsIsLoading = useSelector(getBasketIsLoading);
   
  const favoriteDataIsLoading = useSelector(getFavoriteIsLoading);
  const favoriteData = useSelector(getFavoriteData);
   
  const httpQuery = new URLSearchParams(location.search);

  useEffect(() => {
    if (!favoriteDataIsLoading) {
      dispatch(fetchFavoriteProduct({
        userGuid: userInfo?.userGUID!,
        contractGuid: curentContract
          ? curentContract?.guid
          : httpQuery.get("contractGUID"), 
      }));
    }
    if (!basketProductsIsLoading) {
      dispatch(fetchBasketProductWithContract({
        userGuid: userInfo?.userGUID!,
        contractGuid: curentContract
          ? curentContract?.guid
          : httpQuery.get("contractGUID"), 
      }));
    }
  }, [dispatch, userInfo, curentContract]);

  return (
    <DynamicModuleLoader
      reducers={reducers}
    >
      <div className={cls.favorite__wrapper}>
                
        <div className={cls.title_text}>
          <Typography variant="h2" align="center">Избранные продукты</Typography> 
        </div>
        <Substrate>
          <VStack gap="16" max align="center" justify="center">
            {favoriteData?.map((elem) => (
              <NomenclatureCard
                key={elem.product_guid}
                // nomenclature={elem}
                guid={elem.product_guid}
                isWithGuid
                basketList={basketProductsList}
                favoriteList={[{
                  user_guid: userInfo?.userGUID!,
                  product_guid: elem.product_guid,
                }]}
              />
            ))}
          </VStack>
        </Substrate> 
      </div>
    </DynamicModuleLoader>
  );
});

export const FavoriteProductsMenu = React.memo(Component);
