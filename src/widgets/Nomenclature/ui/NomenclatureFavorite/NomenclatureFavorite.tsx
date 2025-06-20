import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Icon } from "@shared/libs/icons";
import { IFavorite, favoriteActions } from "@entities/FavoriteProducts";
import { UserDataType } from "@entities/user";
import { useAppDispatch } from "@shared/hooks";
import { addToFavoriteActions, fetchAddToFavorite } from "@features/AddToFavorite";
import { deleteFromFavoriteActions, fetchDeleteFromFavorite } from "@features/DeleteFromFavorite";
import { getCurrentTradePoint } from "@entities/TradePoint";
import { INomenclature } from "../../model/types/nomenclature";
import cls from "./NomenclatureFavorite.module.scss";
import { useAlertsInfo } from "../../model/libs/hooks/useAlertsInfo";

interface NomenclatureFavoriteProps {
  favoriteList: IFavorite[];
  nomenclatureData: INomenclature;
  user: UserDataType;
}

const Component = ({
  favoriteList,
  nomenclatureData,
  user,
}: NomenclatureFavoriteProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const tradePoint = useSelector(getCurrentTradePoint);
  const dispatch = useAppDispatch();
  const {
    onOpenAlertAddSuccess,
    onOpenAlertDeleteSuccess,
    onOpenAlertAddError,
    onOpenAlertDeleteError,
  } = useAlertsInfo();

  const handleAddToFavorite = async () => {
    const CurrentTradePoint = tradePoint?.guid;
    const response = await dispatch(fetchAddToFavorite({
      product_guid: nomenclatureData.guid,
      user_guid: user!.userGUID,
      user_name: user!.user_info!.username,
      currentTradePoint: CurrentTradePoint!,
    }));
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(addToFavoriteActions.addToFavorite(response.meta.arg));
      setIsFavorite(true);
      onOpenAlertAddSuccess();
    } else {
      onOpenAlertAddError();
    }
  };

  const handleDeleteFromFavorite = async () => {
    const CurrentTradePoint = tradePoint?.guid;
    const response = await dispatch(fetchDeleteFromFavorite({
      productGuid: nomenclatureData.guid!,
      userGuid: user.userGUID!,
      currentTradePoint: CurrentTradePoint!,
    }));
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(deleteFromFavoriteActions.deleteFromFavorite(nomenclatureData.guid!));
      dispatch(favoriteActions.deleteFromFavorite(nomenclatureData.guid!));
      setIsFavorite(false);
      onOpenAlertDeleteSuccess();
    } else {
      onOpenAlertDeleteError();
    }
  };
   
  const onValidateDelOrAddFavorite = useCallback(() => {
    if (!isFavorite) {
      handleAddToFavorite();
    } else {
      handleDeleteFromFavorite();
    }
  }, [isFavorite, handleAddToFavorite, handleDeleteFromFavorite]);

  useEffect(() => {
    // if (!favoriteIsLoading) {
    //    dispatch(fetchFavoriteProduct({ userGuid: user?.userGUID!, contractGuid: tradePoint?.guid! }));
    // }
    favoriteList?.map((favorite) => (favorite.product_guid === nomenclatureData!.guid
            && setIsFavorite(true)));
  }, [dispatch, user, setIsFavorite, favoriteList]);

  return (
    <div className={cls.add_to_favorite__wrapper} onClick={onValidateDelOrAddFavorite}>
      <Icon
        name="heart"
        size={30}
        color={isFavorite
          ? "red-primary"
          : "gray-primary"}
      />
    </div>
  );
};

export const NomenclatureFavorite = React.memo(Component);
