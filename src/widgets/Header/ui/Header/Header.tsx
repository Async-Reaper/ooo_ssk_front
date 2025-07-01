import { SelectTradePoint } from "@entities/TradePoint";
import { getUserAuthData, getUserRole, UserRoles } from "@entities/user";
import { BasketLink, BasketPlate, BasketPlateFromSeller } from "@features/BasketLink";
import { DebtsPlate } from "@features/Debts";
import { SearchProduct } from "@features/SearchProduct";
import { getRouteOrders } from "@shared/const/router";
import { useMediaQuery } from "@shared/hooks";
import { AppLink, HStack, Typography } from "@shared/ui";
import { OrderHeader } from "@widgets/OrderHeader";
import { SidebarButton } from "@widgets/Sidebar";
import { SumBasketData } from "@widgets/SumBasket";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FavoriteMenu } from "@widgets/FavoriteFromSeller";
import { Navigation } from "../Navigation/Navigation";
import cls from "./Header.module.scss";

const Component = () => {
  const userRole = useSelector(getUserRole);

  const tabletsWidthMediaQuery = useMediaQuery("(max-width: 770px)");
  const mobileWidthMediaQuery2 = useMediaQuery("(max-width: 500px)");
  const userInfo = useSelector(getUserAuthData);
  const [plate, setPlate] = useState(false);
  const [isShowHeader, setIsShowHeader] = useState(true);
  const pathname = useLocation();

  const onHandleEnter = () => {
    setPlate(true);
  };

  const onHandleLeave = () => {
    setPlate(false);
  };

  useEffect(() => {
    if (userRole === UserRoles.BUYER || (userRole === UserRoles.SELLER && pathname.search !== "")) {
      setIsShowHeader(true);
    } else {
      setIsShowHeader(false);
    }
  }, [userRole, pathname, setIsShowHeader]);

  return (
    <div className={cls.header__wrapper}>
      {
        isShowHeader
        && (
          <>
            <div className={cls.header__top}>
              <div className={userRole === UserRoles.BUYER
                ? cls.navigation__wrapper
                : cls.navigation__wrapper_seller}
              >
                <Navigation />
              </div>
              <div className={cls.sidebar__button}>
                <SidebarButton />
              </div>
              <HStack gap="16">
                <div onMouseEnter={onHandleEnter}>
                  <HStack className={cls.basket_wrap} align="center" justify="center" gap="8">
                    <SumBasketData />
                    <BasketLink />
                  </HStack>
                </div>

                {plate
                && (
                  <div onMouseLeave={onHandleLeave}>
                    {userRole === UserRoles.BUYER
                      ? (<BasketPlate />)
                      : (<BasketPlateFromSeller />)}
                  </div>
                )}

                {!tabletsWidthMediaQuery
                && (
                  <div className={cls.search__product__wrapper}>
                    <SearchProduct />
                  </div>
                )}
              </HStack>
            </div>
            <hr className={cls.header__line} />
          </>
        )
      }
      {userRole === UserRoles.SELLER && (
        <div className={cls.orders__link__wrapper}>
          <AppLink className={cls.orders__link} variant="secondary" to={getRouteOrders()}>
            <Typography className={cls.assort} variant="h3">Посмотреть все заказы</Typography>
          </AppLink>
          <FavoriteMenu />
        </div>
      )}
      <div className={cls.header__bottom}>

        <Typography className={cls.hello_text} variant="h3" align="center" bold>
          Добро пожаловать,
          {" "}
          {mobileWidthMediaQuery2 && (<br />)}
          {userInfo?.user_info?.username}
          !
        </Typography>

        {userRole === UserRoles.BUYER
            && (
              <>
                <SelectTradePoint />
                <DebtsPlate />
              </>
            )}
        {userRole === UserRoles.SELLER && <OrderHeader />}
      </div>
    </div>
  );
};

export const Header = React.memo(Component);
