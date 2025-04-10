import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Conditions } from "../../../../shared/libs/conditions/conditions";
// import { Skeleton } from "../../../../shared/ui/Skeleton";
import cls from "./BasketPlateFromSeller.module.scss";
import {
  HStack, Loader, Typography, VStack,
} from "../../../../shared/ui";
import { DynamicModuleLoader, ReducersList } from "../../../../shared/libs/component";
import { SumBasketData } from "../../../../widgets/SumBasket/ui/SumBasket";
import { useAppDispatch } from "../../../../shared/hooks";
import { getUserAuthData } from "../../../../entities/user";
import { classNames } from "../../../../shared/libs/classNames/classNames";
import { getRouteBasket } from "../../../../shared/const/router";
import { getSellerData, getSellerDataIsLoading } from "../../../../features/GetSellerData/model/selectors/getSellerDataSelectors";
import { fetchGetSellerData } from "../../../../features/GetSellerData/model/services/fetchGetSellerData";
import { getCurrentSellerOrders, sellerDataReducer } from "../../../../entities/SellerOrders";
import { getSellerDataReducer } from "../../../../features/GetSellerData/model/slice/getSellerDataSlice";
import { deleteFromSellerDataReducer } from "../../../../features/DeleteFromSellerData/model/slice/deleteFromSellerDataSlice";
import { nomenclaturesWhiteListReducer } from "../../../../widgets/Nomenclature/model/slice/nomenclaturesWhiteListSlice";
import { getNomenclaturesWhiteList } from "../../../../widgets/Nomenclature/model/selectors/nomenclaturesWhiteList";
import { fetchNomenclaturesWhiteList } from "../../../../widgets/Nomenclature/model/services/fetchNomenclaturesWhiteList";
import { addToSellerDataReducer } from "../../../../features/AddToSellerData";

const reducers: ReducersList = {
  getSellerData: getSellerDataReducer,
  deleteFromSellerData: deleteFromSellerDataReducer,
  nomenclaturesWhiteList: nomenclaturesWhiteListReducer,
  addToSellerData: addToSellerDataReducer,
  sellerOrdersForm: sellerDataReducer, 
};

const Component = () => {
  const dispatch = useAppDispatch();

  const sellerData = useSelector(getSellerData);
  const sellerIsLoading = useSelector(getSellerDataIsLoading);
  // const orderProducts = sellerData?.document_data.products;

  const currentSellerOrder = useSelector(getCurrentSellerOrders);
  const orderProducts = currentSellerOrder?.document_data.products;

  const nomenclaturesWhiteList = useSelector(getNomenclaturesWhiteList);

  const user = useSelector(getUserAuthData);

  useEffect(() => {
    if (sellerData === undefined && sellerIsLoading === false) {
      dispatch(fetchGetSellerData({
        document_guid: currentSellerOrder?.document_guid!,
        user_guid: user?.userGUID!,
      }));
    }
  }, [dispatch, user, currentSellerOrder]);

  useEffect(() => {
    if (orderProducts !== undefined) {
      dispatch(fetchNomenclaturesWhiteList({
        nomenclatures: orderProducts.filter((guid) => guid !== undefined).map((product) => product.product_guid) as string[],
      }));
    }
  }, [dispatch, orderProducts]);

  return (
    <DynamicModuleLoader reducers={reducers}>

      <Conditions condition={location.pathname === getRouteBasket() && sellerIsLoading}>
        <div className={cls.plate_object}>
          <Loader />
        </div>
      </Conditions>
      <Conditions condition={location.pathname === getRouteBasket() && orderProducts?.length}>
        <div className={cls.plate_object}>
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
                  Цена / Ед. изм.
                </Typography>
              </div>

              <div className={cls.plate_column}>
                <Typography variant="h5">
                  Кол-во
                </Typography>
              </div>

              <div className={classNames(cls.amount, {}, [cls.plate_column])}>
                <Typography inline variant="h5">
                  Сумма
                </Typography>
              </div>
            </HStack>
            {/* заголовок таблицы */}

            {/* содержимое */}
            <Conditions condition={!sellerIsLoading}>
              {orderProducts?.map((product) => (
                <HStack className={cls.plate_row} max key={product?.product_guid}>
                  <div className={classNames(cls.name, {}, [cls.plate_column])}>
                    <Typography variant="h5">
                      { nomenclaturesWhiteList !== undefined
                                 && nomenclaturesWhiteList?.filter((productData) => productData.guid === product.product_guid).length 
                                 && nomenclaturesWhiteList?.filter((productData) => productData.guid === product.product_guid)[0].short_name }
                    </Typography>
                  </div>

                  <div className={cls.plate_column}>
                    <Typography variant="h5">
                      {product?.price}
                      {" "}
                      ₽
                      /
                      {" "}
                      { nomenclaturesWhiteList !== undefined 
                                 && nomenclaturesWhiteList?.filter((productData) => productData.guid === product.product_guid).length 
                                 && nomenclaturesWhiteList?.filter((productData) => productData.guid === product.product_guid)[0].measurement }
                    </Typography>
                  </div>

                  <div className={cls.plate_column}>
                    <Typography variant="h5">
                      {product?.count}
                    </Typography>
                  </div>

                  <div className={classNames(cls.amount, {}, [cls.plate_column])}>
                    <Typography inline variant="h5">
                      {`${(product.count! * product.price!).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`}
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
      </Conditions>
    </DynamicModuleLoader>
  );
};

export const BasketPlateFromSeller = React.memo(Component);
