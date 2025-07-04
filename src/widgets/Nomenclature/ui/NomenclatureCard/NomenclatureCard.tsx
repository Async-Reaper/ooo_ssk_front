import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  AppImage, Typography, VStack,
} from "@shared/ui";
import { getUserAuthData } from "@entities/user";
import { IFavorite } from "@entities/FavoriteProducts";
import { deleteFromBasketReducer, DeleteFromBasketSelectProduct } from "@features/DeleteFromBasket";
import { HistoryOrderProductButton } from "@features/HistoryOrderProduct";
import { IBasket } from "@entities/BasketEntitie";
import { getCurrentTradePoint } from "@entities/TradePoint";
import { useAppDispatch, useModal } from "@shared/hooks";
import { __API__ } from "@shared/protocols/api";
import { Conditions } from "@shared/libs/conditions/conditions";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { addToFavoriteReducer } from "@features/AddToFavorite";
import { deleteFromFavoriteReducer } from "@features/DeleteFromFavorite";
import { addToBasketReducer } from "@features/AddToBasket";
import { classNames } from "@shared/libs/classNames/classNames";
import { NomenclatureFavorite } from "../NomenclatureFavorite/NomenclatureFavorite";
import { NomenclatureCount } from "../NomenclatureCount/NomenclatureCount";
import { INomenclature } from "../../model/types/nomenclature";
import cls from "./NomenclatureCard.module.scss";
import { NomenclatureInfo } from "../NomenclatureInfo/NomenclatureInfo";
import { nomenclatureReducer } from "../../model/slice/nomenclatureSlice";
import { fetchNomenclatureById } from "../../model/services/fetchNomenclatureById";

interface NomenclatureCardProps {
  count?: number;
  nomenclature?: INomenclature;
  favoriteList?: IFavorite[];
  basketList?: IBasket[];
  isWithGuid?: boolean;
  guid?: string;
  isBasket?: boolean;
}

const reducers: ReducersList = {
  addToFavoriteForm: addToFavoriteReducer,
  deleteFromFavoriteForm: deleteFromFavoriteReducer,
  nomenclature: nomenclatureReducer,
  addToBasketForm: addToBasketReducer,
  deleteFromBasketForm: deleteFromBasketReducer,
};

const Component = ({
  count,
  nomenclature,
  isWithGuid,
  favoriteList,
  basketList,
  guid,
  isBasket = false,
}: NomenclatureCardProps) => {
  const { isOpen, open, close } = useModal();
  const dispatch = useAppDispatch();
  const user = useSelector(getUserAuthData);
  const [nomenclatureById, setNomenclatureById] = useState<INomenclature>();
  const nomenclatureData = nomenclature || nomenclatureById;
  const currentTradePoint = useSelector(getCurrentTradePoint);

  const getNomenclatureById = useCallback(async () => {
    if (isWithGuid && guid) {
      const response = await dispatch(fetchNomenclatureById({
        productGUID: guid,
        contractGUID: currentTradePoint?.guid,
      }));
      if (response.meta.requestStatus === "fulfilled") {
        setNomenclatureById(response.payload);
      }
    }
  }, [dispatch, isWithGuid, guid, setNomenclatureById, currentTradePoint]);

  useEffect(() => {
    getNomenclatureById();
  }, [getNomenclatureById]);

  return (
    <DynamicModuleLoader
      reducers={reducers}
    >
      <div className={cls.nomenclature__wrapper}>
        <Conditions condition={isOpen}>
          <NomenclatureInfo isOpen={isOpen} onClose={close} nomenclature={nomenclatureData!}/>
        </Conditions>
        <div className={cls.nomenclature__image} onClick={open}>
          {nomenclatureData && nomenclatureData!.pictures?.length > 0
            ? (<AppImage src={__API__ + nomenclatureData!.pictures[0].path}/>)
            : nomenclatureData?.path?.length && <AppImage src={__API__ + nomenclatureData!.path}/>}
        </div>

        <div className={cls.nomenclature__description}>
          <div className={cls.name}>
            <Typography variant="h4">
              {nomenclatureData?.short_name}
            </Typography>
          </div>
          <div className={cls.info}>
            {
              currentTradePoint 
                && (
                  <Typography variant="h4">
                    {`${nomenclatureData?.additional_information?.price} ₽/ ${nomenclatureData?.measurement}`}
                  </Typography>
                )
            }
            <div className={cls.expiration_date}>
              <Typography variant="h5">
                Срок годности:
                {" "}
                {nomenclatureData?.expiration_date}
                {" "}
                дней
              </Typography>
            </div>
            {
              nomenclatureData && currentTradePoint && <HistoryOrderProductButton productId={nomenclatureData!.guid}/>
            }
            <div className={cls.nomenclature__other}>
              <Conditions condition={nomenclatureData && favoriteList}>
                <NomenclatureFavorite
                  user={user!}
                  favoriteList={favoriteList!}
                  nomenclatureData={nomenclatureData!}
                />
              </Conditions>
              <div className={cls.measurement}>
                <Typography variant="h5">
                  {nomenclatureData?.measurement}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className={cls.nomenclature__settings}>
          <div
            className={classNames(cls.remains__wrap, { 
              [cls.positive]: nomenclatureData?.additional_information?.remains! > 0,
            })}
          >
            {!currentTradePoint && (
              <Typography variant="h5" bold>
                Не выбрана торговая точка
              </Typography>
            )}
            {(nomenclatureData?.additional_information?.remains! > 0 && currentTradePoint)
              && (
                <Typography variant="h4" bold>
                  в наличии
                </Typography>
              )}
            {(nomenclatureData?.additional_information?.remains! === 0 && currentTradePoint) 
              && (
                <Typography variant="h4" bold>
                  отсутствует
                </Typography>
              )}
          </div>

          <NomenclatureCount
            countValue={count}
            user={user!}
            basketList={basketList!}
            nomenclatureData={nomenclatureData!}
          />
        </div>
        {isBasket && (
          <VStack gap="16" align="center" justify="between" className={cls.trash__wrap}>
            <DeleteFromBasketSelectProduct
              productGUID={nomenclatureData?.guid!}
              productName={nomenclatureData?.short_name!}
            />
          </VStack>
        )}
        {nomenclatureData?.is_new
          && (
            <div className={cls.ribbon}>
              <Typography variant="h4">
                Новинка
              </Typography>
            </div>
          )}
        {nomenclatureData?.is_discount
          && (
            <div className={cls.discount__ribbon}>
              <Typography variant="h4">
                Скидка
              </Typography>
            </div>
          )}
      </div>
    </DynamicModuleLoader>
  );
};

export const NomenclatureCard = React.memo(Component);
