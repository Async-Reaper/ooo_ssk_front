import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserOrders, initUserAuthData } from "@entities/user";
import { useAppDispatch } from "@shared/hooks";
import { VStack } from "@shared/ui";
import { Conditions } from "@shared/libs/conditions/conditions";
import { OrderCardParent } from "../OrderCardParent/OrderCardParent";
import { OrdersListEmpty } from "../OrderListEmpty/OrderListEmpty";

const Component = () => {
  const dispatch = useAppDispatch();
  const currentOrdersList = useSelector(getUserOrders);

  useEffect(() => {
    dispatch(initUserAuthData());
  }, []);

  return (
    <>
      <Conditions condition={!currentOrdersList?.length}>
        <OrdersListEmpty />
      </Conditions>
      <Conditions condition={currentOrdersList?.length}>
        <VStack gap="16">
          {currentOrdersList?.map((order) => (
            <OrderCardParent 
              key={order.contractName}
              buyer={order.buyerName}
              tradePoint={order.contractName}
              amount={order.amount}
              countDocuments={order.countDocuments}
              approvedDocuments={order.approvedDocuments}
              documents={order.documents}
              contractGUID={order.contractGUID}
            />
          ))}
        </VStack>
      </Conditions>
    </>
  );
};

export const OrdersList = React.memo(Component);
