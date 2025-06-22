import { getUserAuthData } from "@entities/user";
import { ApprovedOrderButton } from "@features/ApprovedOrder";
import { getSellerData, getSellerDataReducer } from "@features/GetSellerData";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { HStack, Input, Typography } from "@shared/ui";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { CreateOrderButton, ICreateOrder, ICreateOrderProduct } from "@features/CreateOrder";
import {
  getOrdersHeaderIsLoading,
} from "../../model/selectors/orderHeaderSelectors";
import cls from "./OrderHeader.module.scss";

const reducers: ReducersList = {
  getSellerData: getSellerDataReducer,
};

const Component = () => {
  const params = useParams<{id: string}>();
  const user = useSelector(getUserAuthData);
  const [paramsQuery] = useSearchParams();
  const documentGUID = paramsQuery.get("documentGUID") || params!.id;
  const contractGUID = paramsQuery.get("contractGUID");
  const sellerData = useSelector(getSellerData);
  const orderHeader = sellerData?.document_data.document_header;
  const orderHeaderIsLoading = useSelector(getOrdersHeaderIsLoading);

  const [comment, setComment] = useState("");
  const [dateShipment, setDateShipment] = useState("");
  const currentDate = new Date(dateShipment);

  const convertDate = () => {
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
    const year = currentDate.getFullYear();

    const hours = String(currentDate.getHours() + 1).padStart(2, "0"); // Добавляем +1 час к часам
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`; 
  };

  const [dataCreateOrder, setDataCreateOrder] = useState<ICreateOrder>();

  useEffect(() => {
    setDataCreateOrder({
      header: {
        contractGUID: contractGUID!,
        dateshipment: convertDate(),
        userGUID: user?.userGUID as string,
        comment,
      },
      products: sellerData?.document_data.products!.map((product) => ({
        product_guid: product.product_guid,
        count: product.count,
      })) as ICreateOrderProduct[],
    });
  }, [sellerData, contractGUID, dateShipment, user]);

  useEffect(() => {
    if (!orderHeaderIsLoading) {
      const shipOrderDate = orderHeader?.dateShipment;
      const date = new Date(shipOrderDate !== undefined
        ? shipOrderDate.split("-").reverse().join("-")
        : new Date());
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dateDst = `${year}-${month}-${day}`;
      setDateShipment(dateDst);
    }
  }, [orderHeader?.dateShipment, orderHeaderIsLoading]);

  const handleShipmentChange = (event:string) => {
    setDateShipment(event);
  };

  useEffect(() => {
    if (!orderHeaderIsLoading) {
      setComment(orderHeader?.comment || "");
    }
  }, [orderHeader?.comment, orderHeaderIsLoading]);

  // approved order
  const dataApprovedOrder: any = useMemo(() => ({
    header: {
      userGUID: user?.userGUID,
      documentGUID,
      dateshipment: convertDate(),
      comment,
    },
    products: [],
  }), [user, comment, dateShipment, documentGUID]);

  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={reducers}
    >
      { documentGUID !== undefined && documentGUID !== null
        ? (
          <>
            <Typography className={cls.test} variant="h1" align="center">

              Заказ №
              {orderHeader?.number}
              {" "}
              {orderHeader?.approved}
              {" "}
              от
              {" "}
              {orderHeader?.date}
              <br />
              Дата доставки:
              {" "}
              {orderHeader?.dateShipment || "Не указано"}
              <br />
              {/* Сумма:
                     {" "}
                     {orderHeader?.amount}
                     {" ₽"}
                     <br /> */}
              &quot;
              {orderHeader?.contractName}
              &quot;

            </Typography>
            <HStack gap="16" className={cls.group_success}>
              <input
                className={cls.input_date}
                id="dateShipment"
                type="date"
                value={dateShipment}
                onChange={(e) => handleShipmentChange(e.target.value)}
              />
              <Input value={comment} placeholder="Комментарий" onChange={setComment} />
              {
                (orderHeader?.approved && dataCreateOrder)
                  ? <CreateOrderButton dataCreateOrder={dataCreateOrder} />
                  : <ApprovedOrderButton dataApprovedOrder={dataApprovedOrder} isApproved={orderHeader?.approved} /> 
              }
            </HStack>
          </>
        )
        : ""}

    </DynamicModuleLoader>
         
  );
};

export const OrderHeader = React.memo(Component);
