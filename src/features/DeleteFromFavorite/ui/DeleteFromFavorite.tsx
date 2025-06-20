import { useAppDispatch } from "@shared/hooks";
import { CloseIcon } from "@shared/libs/icons/__generated/general/Close";
import { favoriteSellerActions, IFavoriteProducts } from "@widgets/FavoriteFromSeller";
import React from "react";
import { fetchDeleteFromFavoriteSeller } from "../model/services/fetchDeleteFromFavoriteSeller";
import cls from "./DeleteFromFavorite.module.scss";
import { deleteFromFavoriteActions } from "../model/slice/deleteFromFavoriteSlice";

interface DeleteFromFavoriteProps {
  products: IFavoriteProducts | IFavoriteProducts[];
  userGuid: string;
  userName?: string;
  currentTradePoint: string;
}

const Component = ({
  products, userGuid, currentTradePoint, userName, 
}: DeleteFromFavoriteProps) => {
  const dispatch = useAppDispatch();

  const deleteFromFavoriteArray = async (products: IFavoriteProducts[]) => {
    products.map(async (product) => {
      const response = await dispatch(fetchDeleteFromFavoriteSeller({
        productGuid: product.product_guid,
        userGuid,
        currentTradePoint,
      }));

      if (response.meta.requestStatus === "fulfilled") {
        dispatch(deleteFromFavoriteActions.deleteFromFavorite(product.product_guid));
        userName && dispatch(favoriteSellerActions.deleteFavoriteAll(userName));
      }
    });
  };

  const deleteFromFavorite = async (product: IFavoriteProducts) => {
    const response = await dispatch(fetchDeleteFromFavoriteSeller({
      productGuid: product.product_guid,
      userGuid,
      currentTradePoint,
    }));

    if (response.meta.requestStatus === "fulfilled") {
      dispatch(deleteFromFavoriteActions.deleteFromFavorite(product.product_guid));
      dispatch(favoriteSellerActions.deleteFavoriteById(product.product_guid));
    }
  };

  const handleDeleteFromFavorite = () => {
    if (Array.isArray(products)) {
      deleteFromFavoriteArray(products);
    } else {
      deleteFromFavorite(products);
    }
  };

  return (
    <div className={cls.delete__favorite__button} onClick={handleDeleteFromFavorite}>
      <CloseIcon color="red" />
    </div>
  ); 
};

export const DeleteFromFavorite = React.memo(Component);
