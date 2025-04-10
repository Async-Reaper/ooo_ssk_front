import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import cls from "./OrderHeader.module.scss";
import { DynamicModuleLoader, ReducersList } from "../../../../shared/libs/component";
import { useAppDispatch } from "../../../../shared/hooks";
import { HStack, Input, Typography } from "../../../../shared/ui";
import {
  fetchOrderHeader,
} from "../../model/services/fetchOrderHeader";
import {
  getOrderHeaderData, getOrdersHeaderIsLoading,
} from "../../model/selectors/orderHeaderSelectors";
import { orderHeaderReducer } from "../../model/slice/orderHeaderSlice";
import { ApprovedOrderButton } from "../../../../features/ApprovedOrder";
import { getUserAuthData } from "../../../../entities/user";

const reducers: ReducersList = {
  orderHeader: orderHeaderReducer,
};

const Component = () => {
  const params = useParams<{id: string}>();
  const user = useSelector(getUserAuthData);
  const [paramsQuery] = useSearchParams();
  const documentGUID = paramsQuery.get("documentGUID") || params!.id;
  const orderHeader = useSelector(getOrderHeaderData);
  const orderHeaderIsLoading = useSelector(getOrdersHeaderIsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (documentGUID?.length) {
      dispatch(fetchOrderHeader(documentGUID));
    }
  }, [dispatch, documentGUID]);

  // shipment
  const [dateShipment, setDateShipment] = useState("");

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

  // comment
  const [comment, setComment] = useState("");
  const handleCommentChange = (event:string) => {
    setComment(event);
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
      dateshipment: new Date(dateShipment).toLocaleString(
        "ru-RU", 
        { year: "numeric", month: "numeric", day: "numeric" },
      ).split(".").join(""),
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
              <Input value={comment} placeholder="Комментарий" onChange={handleCommentChange} />
              <ApprovedOrderButton dataApprovedOrder={dataApprovedOrder} /> 
            </HStack>
          </>
        )
        : ""}

    </DynamicModuleLoader>
         
  );
};

export const OrderHeader = React.memo(Component);
