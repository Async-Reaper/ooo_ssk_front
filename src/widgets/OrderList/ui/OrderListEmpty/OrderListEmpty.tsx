import React from "react";
import { Typography } from "@shared/ui";
import cls from "./OrderListEmpty.module.scss";

const Component = () => (
  <div className={cls.empty_object}>
    <Typography align="center" variant="h3">
      В данный момент отсутствуют заказы для утверждения
    </Typography>
  </div>
);

export const OrdersListEmpty = React.memo(Component);
