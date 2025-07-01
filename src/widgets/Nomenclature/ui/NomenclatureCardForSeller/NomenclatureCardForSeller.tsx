import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppImage, Typography, VStack } from "@shared/ui";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { HistoryOrderProductButton } from "@features/HistoryOrderProduct";
import { getCurrentTradePoint } from "@entities/TradePoint";
import { useAppDispatch } from "@shared/hooks";
import { __API__ } from "@shared/protocols/api";
import { DeleteFromSellerDataProductButton } from "@features/DeleteFromSellerData";
import { classNames } from "@shared/libs/classNames/classNames";
import { nomenclatureReducer } from "../../model/slice/nomenclatureSlice";
import { INomenclature } from "../../model/types/nomenclature";
import { fetchNomenclatureById } from "../../model/services/fetchNomenclatureById";
import cls from "../NomenclatureCard/NomenclatureCard.module.scss";
import { NomenclatureCountForSeller } from "../NomenclatureCountForSeller/NomenclatureCountForSeller";

interface NomenclatureCardForSellerProps {
  count?: number;
  price?: number;
  nomenclature?: INomenclature;
  isWithGuid?: boolean;
  guid?: string;
  userGUID?: string;
  documentGUID?: string;
  isShow?: boolean | false;
  isBasket?: boolean | false;
}

const reducers: ReducersList = {
  nomenclature: nomenclatureReducer,
};

const Component = ({
  count,
  price,
  nomenclature,
  isWithGuid,
  guid,
  userGUID,
  documentGUID,
  isShow,
  isBasket = false,
}: NomenclatureCardForSellerProps) => {
  const dispatch = useAppDispatch();
  const httpQuery = new URLSearchParams(location.search);
   
  const [nomenclatureById, setNomenclatureById] = useState<INomenclature>();
  const nomenclatureData = nomenclatureById || nomenclature;
  const currentTradePoint = useSelector(getCurrentTradePoint);
  const curentTradePointGUID = currentTradePoint?.guid! || httpQuery.get("contractGUID")!;

  const getNomenclatureById = useCallback(async () => {
    if (isWithGuid && guid) {
      const response = await dispatch(fetchNomenclatureById({
        productGUID: guid,
        contractGUID: curentTradePointGUID,
      }));
      if (response.meta.requestStatus === "fulfilled") {
        setNomenclatureById(response.payload);
      }
    }
  }, [dispatch, isWithGuid, guid, setNomenclatureById]);

  useEffect(() => {
    getNomenclatureById();
  }, [getNomenclatureById]);

  return (
    <DynamicModuleLoader
      reducers={reducers}
    >
      <div className={cls.nomenclature__wrapper}>
        <div className={cls.nomenclature__image}>
          {nomenclatureData && nomenclatureData!.pictures!.length > 0
                  && <AppImage src={__API__ + nomenclatureData!.pictures[0].path} />}
        </div>
        <div className={cls.nomenclature__description}>
          <div className={cls.name}>
            <Typography variant="h4">
              {nomenclatureData?.short_name}
            </Typography>
          </div>
          <div className={cls.info}>
            <Typography variant="h4">
              <Typography variant="h4">
                {`${nomenclatureData?.additional_information?.price} ₽/ ${nomenclatureData?.measurement}`}
              </Typography>
            </Typography>
            <div className={cls.expiration_date}>
              <Typography variant="h5">
                Срок годности:
                {" "}
                {nomenclatureData?.expiration_date}
                {" "}
                дней
              </Typography>
            </div>
          </div>
          {
            nomenclatureData && currentTradePoint && <HistoryOrderProductButton productId={nomenclatureData!.guid} />
          }
        </div>
        <div className={cls.nomenclature__settings}>
          <div
            className={classNames(cls.remains__wrap, { 
              [cls.positive]: nomenclatureData?.additional_information?.remains! > 0,
            })}
          >
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

          <NomenclatureCountForSeller
            price={price}
            isShow={isShow}
            userGUID={userGUID}
            documentGUID={documentGUID}
            countValue={count}
            nomenclatureData={nomenclatureData!}
            productGUID={guid}
          />
        </div>

        { isBasket && (            
          <VStack gap="16" align="center" justify="between" className={cls.trash__wrap}>
            <DeleteFromSellerDataProductButton 
              // SellerOrder={sellerData}
              productGUID={guid || nomenclatureData?.guid!}
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

export const NomenclatureCardForSeller = React.memo(Component);
