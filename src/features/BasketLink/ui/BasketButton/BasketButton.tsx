import { sellerDataReducer } from "@entities/SellerOrders";
import { UserRoles, getUserRole } from "@entities/user";
import { getSellerData } from "@features/GetSellerData";
import { getRouteBasket } from "@shared/const/router";
import { useMediaQuery } from "@shared/hooks";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { Icon } from "@shared/libs/icons";
import { Typography } from "@shared/ui";
import { getCountBasketOrder } from "@widgets/SumBasket";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import cls from "./BasketButton.module.scss";

const reducers: ReducersList = {
  sellerOrders: sellerDataReducer,
};

const Component = () => {
  // let routeBasket = getRouteBasket();
  const userRole = useSelector(getUserRole);
  const basketCountBuyer = useSelector(getCountBasketOrder);
  const sellerData = useSelector(getSellerData);
  
  const [basketCountSeller, setBasketCountSeller] = useState(0);
  const isColorGray = useMediaQuery("(min-width: 1024px)");
  const [params] = useSearchParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (userRole === UserRoles.SELLER) {
      sellerData?.document_data.products && setBasketCountSeller(sellerData.document_data.products.length);
      // const documentGUID = params.get("documentGUID");
      // const contractGUID = params.get("contractGUID");
      // if (contractGUID !== null && documentGUID !== null) {
      // routeBasket = `${routeBasket}?documentGUID=${documentGUID}&contractGUID=${contractGUID}`;
      // }

      // console.log(documentGUID, contractGUID)
    }
  }, [userRole, sellerData]);

  const onHandleRouteBasket = useCallback(() => {
    if (userRole === UserRoles.SELLER) {
      sellerData?.document_data.products && setBasketCountSeller(sellerData.document_data.products.length);
      const documentGUID = params.get("documentGUID");
      const contractGUID = params.get("contractGUID");
      if (contractGUID !== null && documentGUID !== null) {
        // routeBasket = `${routeBasket}?documentGUID=${documentGUID}&contractGUID=${contractGUID}`;
        navigate(`${getRouteBasket()}?documentGUID=${documentGUID}&contractGUID=${contractGUID}`);
      } else {
        navigate(getRouteBasket());
      }
    }
  }, [userRole, sellerData, params]);

  return (
    <DynamicModuleLoader
      reducers={reducers}
      removeAfterUnmount
    >
      <div onClick={onHandleRouteBasket} className={cls.basket__title}>
        {/* <AppLink to={routeBasket} className={cls.basket__title}> */}
        <div className={cls.basket__count}>
          <Typography className={cls.count_text} variant="h4" align="center">
            {userRole === UserRoles.BUYER 
              ? basketCountBuyer
              : basketCountSeller}
          </Typography>
        </div>
        <Icon
          name="shopping_cart"
          size={47}
          color={isColorGray
            ? "gray-primary"
            : "white-bg"}
        />
        {/* </AppLink> */}
      </div>
    </DynamicModuleLoader>
  ); 
};
export const BasketButton = React.memo(Component);
