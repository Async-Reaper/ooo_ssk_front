import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  basketReducer, fetchBasketProductWithContract, getBasketData, getBasketIsLoading,
} from "@entities/BasketEntitie";
import { Conditions } from "@shared/libs/conditions/conditions";
import { Skeleton } from "@shared/ui/Skeleton";
import {
  HStack, Loader, Typography, VStack,
} from "@shared/ui";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { addToBasketReducer } from "@features/AddToBasket";
import { deleteFromBasketReducer } from "@features/DeleteFromBasket";
import { SumBasketData } from "@widgets/SumBasket";
import { useAppDispatch } from "@shared/hooks";
import { getCurrentTradePoint } from "@entities/TradePoint";
import { getUserAuthData } from "@entities/user";
import { classNames } from "@shared/libs/classNames/classNames";
import cls from "./BasketPlate.module.scss";

const reducers: ReducersList = {
  basketList: basketReducer,
  addToBasketForm: addToBasketReducer,
  deleteFromBasketForm: deleteFromBasketReducer,
};

const Component = () => {
  const dispatch = useAppDispatch();

  const basketProducts = useSelector(getBasketData);
  const basketIsLoading = useSelector(getBasketIsLoading);
  const currentTradePoint = useSelector(getCurrentTradePoint);
  const user = useSelector(getUserAuthData);

  useEffect(() => {
    if (basketProducts === undefined && basketIsLoading === false && currentTradePoint) {
      dispatch(fetchBasketProductWithContract({ userGuid: user!.userGUID, contractGuid: currentTradePoint.guid }));
    }
  }, [user, currentTradePoint]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={cls.plate_object}>

        <Conditions condition={basketIsLoading}>
          <Skeleton width="100%" height="175px" border="15px" /> 
          <Loader />
        </Conditions>
        <VStack align="center" gap="4" max>
          {/* заголовок таблицы */}

          <HStack className={cls.plate_title} max>

            <div className={classNames(cls.name, {}, [cls.plate_column])}>
              <Typography variant="h5">
                Наименование
              </Typography>
            </div>

            <div className={cls.plate_column}>
              <Typography variant="h5">
                Ед. изм.
              </Typography>
            </div>

            <div className={cls.plate_column}>
              <Typography variant="h5">
                Кол-во
              </Typography>
            </div>

            <div className={classNames(cls.amount, {}, [cls.plate_column])}>
              <Typography variant="h5">
                Сумма
              </Typography>
            </div>
          </HStack>
          {/* заголовок таблицы */}

          {/* содержимое */}
          <Conditions condition={!basketIsLoading}>
            {basketProducts?.map((product) => (
              <HStack className={cls.plate_row} max key={product?.product_guid}>

                <div className={classNames(cls.name, {}, [cls.plate_column])}>
                  <Typography variant="h5">
                    {product?.other_data?.full_name}
                  </Typography>
                </div>

                <div className={cls.plate_column}>
                  <Typography variant="h5">
                    {product?.other_data?.additional_information?.price}
                    {" "}
                    ₽
                    /
                    {" "}
                    {product?.other_data?.measurement}
                  </Typography>
                </div>

                <div className={cls.plate_column}>
                  <Typography variant="h5">
                    {product?.count}
                  </Typography>
                </div>

                <div className={classNames(cls.amount, {}, [cls.plate_column])}>
                  <Typography inline variant="h5">
                    {`${(product.count * product.other_data.additional_information.price).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`}
                  </Typography>
                </div>
              </HStack>
            ))}
            <div className={cls.plate_sum}>
              <Typography variant="h5">
                Итого:
                <SumBasketData />
              </Typography>
            </div>
          </Conditions>
        </VStack>
      </div>
    </DynamicModuleLoader>
  );
};

export const BasketPlate = React.memo(Component);
