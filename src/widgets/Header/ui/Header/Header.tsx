import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BasketLink, BasketPlate, BasketPlateFromSeller } from "@features/BasketLink";
import { SearchProduct } from "@features/SearchProduct";
import { HStack, Typography } from "@shared/ui";
import { SelectTradePoint } from "@entities/TradePoint";
import { SidebarButton } from "@widgets/Sidebar";
import { getUserAuthData, getUserRole, UserRoles } from "@entities/user";
import { SumBasketData } from "@widgets/SumBasket";
import { useMediaQuery } from "@shared/hooks";
import { DebtsPlate } from "@features/Debts";
import { OrderHeader } from "@widgets/OrderHeader";
import cls from "./Header.module.scss";
import { Navigation } from "../Navigation/Navigation";

const Component = () => {
  const userRole = useSelector(getUserRole);

  const mobileWidthMediaQuery1 = useMediaQuery("(max-width: 770px)");
  const mobileWidthMediaQuery2 = useMediaQuery("(max-width: 500px)");
  const userInfo = useSelector(getUserAuthData);
  const [plate, setPlate] = useState(false);

  const onHandleEnter = () => {
    setPlate(true);
  };

  const onHandleLeave = () => {
    setPlate(false);
  };

  return (
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
        <HStack gap="16">
          <div onMouseEnter={onHandleEnter}>
            <HStack className={cls.basket_wrap} align="center" justify="center" gap="16">
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

          {!mobileWidthMediaQuery1
              && (
                <div className={cls.search__product__wrapper}>
                  <SearchProduct />
                </div>
              )}
        </HStack>
      </div>
      <hr className={cls.header__line} />
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
