import {
  AppRoutes,
  getRouteBasket,
  getRouteBrands,
  getRouteHistory,
  getRouteHistoryId,
  getRouteLogin,
  getRouteMain,
  getRouteOrderId,
  getRouteOrders,
  getRouteTest,
  getRouteFavorites,
} from "../../../../shared/const/router";
import { AppRoutesProps } from "../../../../shared/types/router";
import { NotFoundPage } from "../../../../pages/NotFoundPage";
import { MainPage } from "../../../../pages/MainPage";
import { LoginPage } from "../../../../pages/LoginPage";
import { HistoryPage } from "../../../../pages/HistoryPage";
import { HistoryIdPage } from "../../../../pages/HistoryIdPage";
import { BasketPage } from "../../../../pages/BasketPage";
import { BrandPage } from "../../../../pages/BrandPage";
import { OrdersPage } from "../../../../pages/OrdersPage";
import { TestingPage } from "../../../../pages/TestingPage";
import { OrderIdPage } from "../../../../pages/OrderIdPage";
import { UserRoles } from "../../../../entities/user";
import { FavorivePage } from "../../../../pages/FavorivePage";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.HISTORY]: {
    path: getRouteHistory(),
    element: <HistoryPage />,
    authOnly: true,
    roles: UserRoles.BUYER,
  },
  [AppRoutes.HISTORY_ID]: {
    path: getRouteHistoryId(":id"),
    element: <HistoryIdPage />,
    authOnly: true,
    roles: UserRoles.BUYER,
  },
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
    authOnly: true,
  },
  [AppRoutes.TEST]: {
    path: getRouteTest(),
    element: <TestingPage />,
    authOnly: false,
  },
  [AppRoutes.LOGIN]: {
    path: getRouteLogin(),
    element: <LoginPage />,
  },
  [AppRoutes.BASKET]: {
    path: getRouteBasket(),
    element: <BasketPage />,
    authOnly: true,
  },
  [AppRoutes.FAVORITES]: {
    path: getRouteFavorites(),
    element: <FavorivePage />,
    authOnly: true,
  },
  [AppRoutes.BRANDS]: {
    path: getRouteBrands(),
    element: <BrandPage />,
    authOnly: true,
  },
  [AppRoutes.ORDERS]: {
    path: getRouteOrders(),
    element: <OrdersPage />,
    roles: UserRoles.SELLER,
    authOnly: true,
  },
  [AppRoutes.ORDER_ID]: {
    path: getRouteOrderId(":id"),
    element: <OrderIdPage />,
    roles: UserRoles.SELLER,
    authOnly: true,
  },
  // last
  [AppRoutes.NOT_FOUND]: {
    path: "*",
    element: <NotFoundPage />,
  },
};
