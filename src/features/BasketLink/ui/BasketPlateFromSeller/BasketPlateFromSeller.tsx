import { sellerDataReducer } from "@entities/SellerOrders";
import { deleteFromSellerDataReducer } from "@features/DeleteFromSellerData";
import {
  getSellerData, getSellerDataIsLoading,
  getSellerDataReducer,
} from "@features/GetSellerData";
import { useAppDispatch } from "@shared/hooks";
import { classNames } from "@shared/libs/classNames/classNames";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { Conditions } from "@shared/libs/conditions/conditions";
import {
  HStack, Loader, Typography, VStack,
} from "@shared/ui";
import {
  fetchNomenclaturesWhiteList,
  getNomenclaturesWhiteList,
  nomenclaturesWhiteListReducer,
} from "@widgets/Nomenclature";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { addToSellerDataReducer } from "@features/AddToSellerData";

import cls from "../BasketPlate/BasketPlate.module.scss";

const reducers: ReducersList = {
  getSellerData: getSellerDataReducer,
  deleteFromSellerData: deleteFromSellerDataReducer,
  nomenclaturesWhiteList: nomenclaturesWhiteListReducer,
  addToSellerData: addToSellerDataReducer,
  sellerOrders: sellerDataReducer, 
};

const Component = () => {
  const dispatch = useAppDispatch();

  const [totalPrice, setTotalPrice] = useState(0);
  const sellerData = useSelector(getSellerData);
  const sellerIsLoading = useSelector(getSellerDataIsLoading);
  const nomenclaturesWhiteList = useSelector(getNomenclaturesWhiteList);
  const orderProducts = sellerData?.document_data.products;

  useEffect(() => {
    dispatch(fetchNomenclaturesWhiteList({
      nomenclatures: orderProducts?.filter((orderProduct) => orderProduct !== undefined).map((product) => product.product_guid) as string[],
    }));

    if (orderProducts) {
      orderProducts.map((orderProduct) => {
        setTotalPrice(totalPrice + (orderProduct.price * orderProduct.count));
      });
    }
  }, [dispatch, orderProducts]);

  return (
    <DynamicModuleLoader reducers={reducers}>

      <Conditions condition={sellerIsLoading}>
        <div className={cls.plate_object}>
          <Loader />
        </div>
      </Conditions>
      <Conditions condition={sellerData?.document_data.products}>
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

            {orderProducts?.map((product) => (
              <HStack className={cls.plate_row} max key={product?.product_guid}>
                <div className={classNames(cls.name, {}, [cls.plate_column])}>
                  <Typography variant="h5">
                    { (nomenclaturesWhiteList !== undefined
                                && nomenclaturesWhiteList?.filter((productData) => productData.guid === product.product_guid).length)
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
                    { (nomenclaturesWhiteList !== undefined 
                                && nomenclaturesWhiteList?.filter((productData) => productData.guid === product.product_guid).length)
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
                    {(product.count! * product.price!).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                    {" "}
                    ₽
                  </Typography>
                </div>
              </HStack>
            ))}
            <div className={cls.plate_sum}>
              <Typography variant="h5">
                Итого:
                {" "}
              </Typography>
              <Typography variant="h5" bold>
                {totalPrice.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                {" "}
                ₽
              </Typography>
            </div>

          </VStack>
        </div>
      </Conditions>
    </DynamicModuleLoader>
  );
};

export const BasketPlateFromSeller = React.memo(Component);
