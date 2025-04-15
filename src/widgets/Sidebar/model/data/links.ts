import { getRouteBrands, getRouteFavorites, getRouteHistory } from "@shared/const/router";

interface ILink {
  id: number;
  path: string;
  name: string;
}

export const links: ILink[] = [
  {
    id: 1,
    path: getRouteBrands(),
    name: "Бренды",
  },
  {
    id: 2,
    path: getRouteHistory(),
    name: "История заказов",
  },
  {
    id: 3,
    path: getRouteFavorites(),
    name: "Избранные",
  },
];
