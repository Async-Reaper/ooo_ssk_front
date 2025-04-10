import React from "react";
import { AppLink, Typography } from "@shared/ui";
import { useSelector } from "react-redux";
import cls from "./BasketEmpty.module.scss";
import { UserRoles, getUserRole } from "../../../../entities/user";
import { getRouteMain, getRouteOrders } from "../../../../shared/const/router";

const Component = () => {
  const userRole = useSelector(getUserRole);
  return (
    <div className={cls.empty__wrapper}>
      <Typography variant="h2" bold>
        Корзина пуста
      </Typography>
      <Typography variant="h3">
        Вернитесь на 
        {" "}
        <AppLink
          className={cls.returnHome_object}
          to={
            userRole === UserRoles.BUYER
              ? getRouteMain()
              : getRouteOrders()
          }
          variant="blue"
        >
          главную страницу

        </AppLink>
        , чтобы найти всё, что нужно.
      </Typography>
    </div>
  ); 
};

export const BasketEmpty = React.memo(Component);
