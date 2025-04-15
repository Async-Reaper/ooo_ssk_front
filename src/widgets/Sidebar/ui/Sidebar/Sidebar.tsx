import React, { memo } from "react";
import { useSelector } from "react-redux";
import { getSidebarCollapsed, uiActions } from "@features/UI";
import { useAppDispatch } from "@shared/hooks";
import { Icon } from "@shared/libs/icons";
import { classNames, Mods } from "@shared/libs/classNames/classNames";
import { AppImage, AppLink } from "@shared/ui";
import { getRouteMain, getRouteOrders } from "@shared/const/router";
import { UserRoles, getUserRole } from "@entities/user";
import { LogoutButton } from "@features/Auth";
import { SearchProduct } from "@features/SearchProduct";
import { SidebarNavigation } from "../SidebarNavigation/SidebarNavigation";
import cls from "./Sidebar.module.scss";

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const isCollapsed = useSelector(getSidebarCollapsed);
  const userRole = useSelector(getUserRole);
  let routeMain = getRouteMain();
  if (userRole === UserRoles.SELLER) {
    routeMain = getRouteOrders();
  } 

  const mods: Mods = { [cls.collapsed]: isCollapsed };

  const onChangeCollapsedSidebar = () => dispatch(uiActions.setSidebarCollapsed(!isCollapsed));

  return (
    <aside
      id="Sidebar"
      data-testid="sidebar"
      className={classNames(cls.sidebar, mods, [className])}
    >
      <div className={cls.sidebar__wrap}>
        <div className={cls.sidebar__head}>
          <div className={cls.close__button} onClick={onChangeCollapsedSidebar}>
            <Icon name="close" size={50} color="gray-primary" />
          </div>
        </div>
        <div className={cls.sidebar__logo} onClick={onChangeCollapsedSidebar}>
          <AppLink to={routeMain}>
            <AppImage className={cls.logo} src="/common/logo.png" />
          </AppLink>
        </div>
        <div className={cls.search__product__wrapper}>
          <SearchProduct />
        </div>
        <SidebarNavigation />
        <div className={cls.logout_btn} onClick={onChangeCollapsedSidebar}>
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
});
