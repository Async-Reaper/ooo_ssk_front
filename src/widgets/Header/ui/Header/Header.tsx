import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BasketLink, BasketPlate, BasketPlateFromSeller } from "@features/BasketLink";
import { SearchProduct } from "@features/SearchProduct";
import {
  AppImage, AppLink, Container, HStack, Typography,
} from "@shared/ui";
import { SelectTradePoint } from "@entities/TradePoint";
import { SidebarButton } from "@widgets/Sidebar";
import { getRouteMain, getRouteOrders } from "@shared/const/router";
import {
  UserRoles, getUserAuthData, getUserRole,
} from "@entities/user";
import { SumBasketData } from "@widgets/SumBasket";
import { useMediaQuery } from "@shared/hooks";
import { DebtsPlate } from "@features/Debts";
import cls from "./Header.module.scss";
import { Navigation } from "../Navigation/Navigation";

const Component = () => {
  const userRole = useSelector(getUserRole);
  let routeMain = getRouteMain();
  if (userRole === UserRoles.SELLER) {
    routeMain = getRouteOrders();
  }

  const mobileWidthMediaQuery1 = useMediaQuery("(max-width: 770px)");
  const mobileWidthMediaQuery2 = useMediaQuery("(max-width: 500px)");
  const userInfo = useSelector(getUserAuthData);
  const [plate, setPlate] = useState(false);

  return (
    <Container>
      <div className={cls.header__wrapper}>
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

          <HStack>
            <div onMouseEnter={() => setPlate(true)}>
              <HStack className={cls.basket_wrap} align="center" justify="center" gap="16">

                {/* <SumBasketData /> */}

                <BasketLink />

              </HStack>
            </div>
            
            {plate && !mobileWidthMediaQuery1
              && (
                <div onMouseLeave={() => setPlate(!plate)}>
                  {userRole === UserRoles.BUYER
                    ? (<BasketPlate />)
                    : (<BasketPlateFromSeller />)}
                </div>
              )}

            {!mobileWidthMediaQuery1
              && (
                <div className={cls.searchseller_wrap}>
                  <SearchProduct />
                </div>
              )}
          </HStack>

        </div>
        <div className={cls.header__bottom}>

          {mobileWidthMediaQuery1
            && (

              <SearchProduct />

            )}

          <Typography className={cls.hello_text} variant="h2" align="center" bold>
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
          {/* {userRole === UserRoles.SELLER && <OrderHeader />} */}
        </div>
      </div>
    </Container>
  );
};

export const Header = React.memo(Component);
