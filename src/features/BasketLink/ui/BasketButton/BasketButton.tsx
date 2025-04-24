import { useSearchParams } from "react-router-dom";
import React, { useEffect } from "react";
import { AppLink, Typography } from "@shared/ui";
import { Icon } from "@shared/libs/icons";
import { useSelector } from "react-redux";
import { getBasketData } from "@entities/BasketEntitie";
import { useAppDispatch, useMediaQuery } from "@shared/hooks";
import { getRouteBasket } from "@shared/const/router";
import { UserRoles, getUserRole } from "@entities/user";
import { getCountBasketOrder } from "@widgets/SumBasket";
import cls from "./BasketButton.module.scss";

const Component = () => {
  let routeBasket = getRouteBasket();
  const userRole = useSelector(getUserRole);
  const count = useSelector(getBasketData);
  const isColorGray = useMediaQuery("(min-width: 1024px)");
  
  const dispatch = useAppDispatch();

  useEffect(() => {
      
  }, [dispatch, count]);
   
  const basketCount = useSelector(getCountBasketOrder);
  const [params] = useSearchParams();
  if (userRole === UserRoles.SELLER) {
    const documentGUID = params.get("documentGUID");
    const contractGUID = params.get("contractGUID");
    if (contractGUID !== null && documentGUID !== null) {
      routeBasket = `${routeBasket}?documentGUID=${documentGUID}&contractGUID=${contractGUID}`;
    }
  }

  return (
    <AppLink to={routeBasket} className={cls.basket__title}>
      <div className={cls.basket__count}>
        <Typography className={cls.count_text} variant="h4" align="center">
          {basketCount}
        </Typography>
      </div>
      <Icon
        name="shopping_cart"
        size={47}
        color={isColorGray
          ? "gray-primary"
          : "white-bg"}
      />
    </AppLink>
  ); 
};
export const BasketButton = React.memo(Component);
