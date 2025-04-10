export enum AppRoutes {
  MAIN = "main",
  LOGIN = "login",
  BASKET = "basket",
  HISTORY = "history",
  HISTORY_ID = "history_id",
  BRANDS = "brands",
  FAVORITES = "favorites",
  ORDERS = "orders",
  ORDER_ID = "order_id",
  NOT_FOUND = "not_found",
  TEST = "test",
}

export const getRouteMain = () => "/nomenclatures";
export const getRouteLogin = () => "/login";
export const getRouteBasket = () => "/basket";
export const getRouteHistory = () => "/history";
export const getRouteHistoryId = (id: string) => `/history/${id}`;
export const getRouteFavorites = () => "/favorites";
export const getRouteBrands = () => "/brands";
export const getRouteOrders = () => "/orders";
export const getRouteOrderId = (id: string) => `/orders/${id}`;
export const getRouteTest = () => "/test";
