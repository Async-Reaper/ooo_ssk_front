import React from "react";
import { AppLink, Typography } from "@shared/ui";
import { useSelector } from "react-redux";
import { UserRoles, getUserRole } from "@entities/user";
import { getRouteMain, getRouteOrders } from "@shared/const/router";
import cls from "./BasketEmpty.module.scss";

const Component = () => {
  const userRole = useSelector(getUserRole);
  return (
    <div className={cls.empty__wrapper}>
      <Typography variant="h3" bold>
        Корзина пуста
      </Typography>
      <Typography variant="h4">
        Вернитесь на 
        {" "}
        <AppLink
          className={cls.returnHome_object}
          to={
            userRole === UserRoles.BUYER
              ? getRouteMain()
              : getRouteOrders()
          }
        >
          главную страницу

        </AppLink>
        , чтобы найти всё, что нужно.
      </Typography>
    </div>
  ); 
};

export const BasketEmpty = React.memo(Component);
