import React from "react";
import { Typography } from "@shared/ui";
import cls from "./HistoryOrdersEmpty.module.scss";

const Component = () => (
  <div className={cls.empty__text}>
    <Typography variant="h3">
      По выбранным датам не нашлось ни одного заказа
    </Typography>
  </div>
);

export const HistoryOrdersEmpty = React.memo(Component);
