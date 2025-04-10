import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
import { useAppDispatch } from "@shared/hooks";
// import { getUserOrders, initUserAuthData } from "@/src/entities/user";
import { initUserAuthData } from "../../../../entities/user";

// interface OrdersListProps {
//    buyerName : string;
//    contractName : string;
//    amount : number;
//    countDocuments : number;
//    approvedDocuments : number;
// }

// const reducers: ReducersList = {
//    currentOrders: getUserOrders,
// };

const Component = () => {
//    const currentOrders = useSelector(getUserOrders);
   
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initUserAuthData());
  }, [dispatch]);

  return (
    123
  );
};

export const OrdersList = React.memo(Component);
