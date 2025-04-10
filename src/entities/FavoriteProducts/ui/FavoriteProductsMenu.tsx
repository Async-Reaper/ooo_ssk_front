import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserAuthData } from "../../user";
import { DynamicModuleLoader, ReducersList } from "../../../shared/libs/component";
import { useAppDispatch } from "../../../shared/hooks";
import cls from "./FavoriteProductsMenu.module.scss";
import { __API__ } from "../../../shared/protocols/api";
import { getCurrentTradePoint } from "../../TradePoint";
import { favoriteReducer } from "../model/slice/favoriteSlice";
import { NomenclatureCard } from "../../../widgets/Nomenclature";
import {
  basketReducer, fetchBasketProductWithContract, getBasketData, getBasketIsLoading, 
} from "../../BasketEntitie";
import { sumBasketReducer } from "../../../widgets/SumBasket";
import { deleteFromFavoriteReducer } from "../../../features/DeleteFromFavorite";
import { fetchFavoriteProduct, getFavoriteData, getFavoriteIsLoading } from "..";
import { Typography } from "../../../shared/ui";
import { Substrate } from "../../../shared/ui/Primitives/Container/Container";

const reducers: ReducersList = {
  favoriteList: favoriteReducer,
  basketList: basketReducer,
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
   
  useEffect(() => {
    if (!favoriteDataIsLoading) {
      dispatch(fetchFavoriteProduct({ userGuid: userInfo?.userGUID!, contractGuid: curentContract?.guid! }));
    }
    if (!basketProductsIsLoading) {
      dispatch(fetchBasketProductWithContract({ userGuid: userInfo?.userGUID!, contractGuid: curentContract?.guid! }));
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
        </Substrate> 
      </div>
    </DynamicModuleLoader>
  );
});

export const FavoriteProductsMenu = React.memo(Component);
