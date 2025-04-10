import { useSearchParams } from "react-router-dom";
import React, { useEffect } from "react";
import { AppLink, Typography } from "@shared/ui";
import { Icon } from "@shared/libs/icons";
import { useSelector } from "react-redux";
import { getBasketData } from "../../../../entities/BasketEntitie";
import cls from "./BasketButton.module.scss";
import { useAppDispatch } from "../../../../shared/hooks";
import { getRouteBasket } from "../../../../shared/const/router";
import { UserRoles, getUserRole } from "../../../../entities/user";
import { getCountBasketOrder } from "../../../../widgets/SumBasket";

const Component = () => {
  let routeBasket = getRouteBasket();
  const userRole = useSelector(getUserRole);
  const count = useSelector(getBasketData);

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
        <Typography className={cls.count_text} variant="h3" align="center">
          {basketCount}
        </Typography>
      </div>
      <Icon name="shopping_cart" size={35} />
         
    </AppLink>
  ); 
};
export const BasketButton = React.memo(Component);
