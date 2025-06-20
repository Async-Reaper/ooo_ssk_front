import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@entities/user";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { useAppDispatch, useModal } from "@shared/hooks";
import { __API__ } from "@shared/protocols/api";
import { Modal } from "@shared/ui/Modal/Modal";
import { Button, VStack } from "@shared/ui";
import { classNames } from "@shared/libs/classNames/classNames";
import { Icon } from "@shared/libs/icons";
import { DeleteFromFavorite } from "@features/DeleteFromFavorite";
import { favoriteSellerReducer } from "../models/slice/favoriteSlice";
import { getFavoriteData } from "../models/selectors/favoriteSelectors";
import { fetchFavoriteById } from "../models/services/fetchFavoriteById";
import cls from "./Favorite.module.scss";

const reducers: ReducersList = {
  favoriteSellerSchema: favoriteSellerReducer,
};

const Component = (() => {
  const favoriteData = useSelector(getFavoriteData);
  const userInfo = useSelector(getUserAuthData);
  const dispatch = useAppDispatch();
  const { isOpen, open, close } = useModal();
  const [isViewProducts, setIsViewProducts] = useState<boolean>(false);

  const onHandleChangeViewProducts = () => {
    setIsViewProducts(!isViewProducts);
  };

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchFavoriteById(userInfo?.userGUID!));
    }
  }, [dispatch, userInfo, isOpen]);

  return (
    <DynamicModuleLoader
      reducers={reducers}
    >
      <Button className={cls.button__favorite} variant="text" onClick={open}>
        <Icon className={cls.icon__favorite} name="favorite" size={30} color="white-bg" />
      </Button>
      <Modal
        isOpen={isOpen}
        isLogo={false}
        onClose={close}
        size="slider"
      >
        <div className={cls.title_favorite}>  
          <h1>Пожелания покупателей</h1> 
        </div> 
        <VStack gap="8" className={cls.favorite__list__wrapper}>
          { favoriteData?.map((favorite) => (
            <div key={favorite.user_guid} className={cls.favorite__wrapper} >
              <div className={cls.favorite__name__wrapper}>
                <div className={cls.favorite__name} onClick={onHandleChangeViewProducts}>
                  <h3>{favorite?.user_name}</h3>
                </div>
                <DeleteFromFavorite 
                  currentTradePoint={favorite.contract_guid} 
                  products={favorite.products} 
                  userGuid={favorite.user_guid} 
                  userName={favorite.user_name}
                />
              </div>
              <VStack gap="4" className={classNames(cls.favorite__products, { [cls.active]: isViewProducts })}>
                {
                  favorite.products.map((product) => (
                    <>
                      <div className={cls.product__wrapper}>
                        <h3 key={product.product_guid}>{product.product_title}</h3>
                        <DeleteFromFavorite currentTradePoint={favorite.contract_guid} products={product} userGuid={favorite.user_guid} />
                      </div>
                      <hr className={cls.product__line}/>
                    </>
                  ))
                }
              </VStack>
            </div>
          ))}
        </VStack>
      </Modal>
    </DynamicModuleLoader>
  );
});

export const FavoriteMenu = React.memo(Component);
