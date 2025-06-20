import {
  AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject, 
} from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { BasketSchema } from "@entities/BasketEntitie";
import { UserSchema } from "@entities/user";
import { TradePointSchema } from "@entities/TradePoint";
import { FavoriteSchema } from "@entities/FavoriteProducts";
import { AlertSchema } from "@entities/Alerts";
import { NomenclatureSchema, NomenclaturesListSchema, NomenclaturesWhiteListSchema } from "@widgets/Nomenclature";
import { OrderProductsHistoryListSchema } from "@widgets/OrderProductsHistory";
import { AuthSchema } from "@features/Auth";
import { UISchema } from "@features/UI";
import { AddToBasketSchema } from "@features/AddToBasket";
import { DeleteFromBasketSchema } from "@features/DeleteFromBasket";
import { AddToFavoriteSchema } from "@features/AddToFavorite";
import { DeleteFromFavoriteSchema } from "@features/DeleteFromFavorite";
import { NomenclatureGroupSchema } from "@features/NomenclatureGroupSelect";
import { HistoryOrderProductSchema } from "@features/HistoryOrderProduct";
import { HistoryOrdersListSchema, selectDateSchema } from "@features/HistoryOrders";
import { BrandsListSchema } from "@features/BrandsList";
import { SearchProductSchema } from "@features/SearchProduct";
import { ApprovedOrderSchema } from "@features/ApprovedOrder";
import { CreateOrderSchema } from "@features/CreateOrder";
import { OrderHeaderSchema } from "@widgets/OrderHeader";
import { GetSellerDataSchema } from "@features/GetSellerData";
import { DeleteFromSellerDataSchema } from "@features/DeleteFromSellerData";
import { AddToSellerDataSchema } from "@features/AddToSellerData";
import { SellerOrderSchema } from "@entities/SellerOrders";
import { SumBasketShema, StateSumBasket } from "@widgets/SumBasket";
import { FavoriteSellerSchema } from "@widgets/FavoriteFromSeller";
import { DebtsSchema } from "@features/Debts";

export interface StateSchema {
  user: UserSchema,
  ui: UISchema,
  search: SearchProductSchema
  nomenclature?: NomenclatureSchema;
  nomenclaturesList?: NomenclaturesListSchema
  nomenclaturesWhiteList?: NomenclaturesWhiteListSchema
  authForm?: AuthSchema,
  tradePointForm?: TradePointSchema

  // additional method for user
  debts?: DebtsSchema,

  // BasketLink
  addToBasketForm?: AddToBasketSchema
  deleteFromBasketForm?: DeleteFromBasketSchema
  basketList?: BasketSchema
  SumBusket?: SumBasketShema
  CurrentSumBusket?: StateSumBasket

  // Favorite products
  addToFavoriteForm?: AddToFavoriteSchema,
  deleteFromFavoriteForm?: DeleteFromFavoriteSchema,
  favoriteList?: FavoriteSchema
  favoriteSellerSchema?: FavoriteSellerSchema

  // Brand
  brandsList?: BrandsListSchema,

  // Nomenclature group
  nomenclatureGroupList?: NomenclatureGroupSchema;

  alerts?: AlertSchema;

  // History order
  historyOrderProduct?: HistoryOrderProductSchema;
  historyOrdersList?: HistoryOrdersListSchema;
  orderProductHistoryList?: OrderProductsHistoryListSchema;
  selectDate?: selectDateSchema; 
   
  // order view
  orderProductList?: OrderProductsHistoryListSchema;
  orderHeader?: OrderHeaderSchema;

  // Orders
  createOrderForm?: CreateOrderSchema
  approvedOrderForm?: ApprovedOrderSchema

  // Sellers
  sellerOrders?: SellerOrderSchema
  deleteFromSellerData?: DeleteFromSellerDataSchema
  getSellerData?: GetSellerDataSchema
  addToSellerData?: AddToSellerDataSchema
}

export type StateSchemaKey = keyof StateSchema;

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;
export interface ReducerManager {
  getReducerMap: () => ReducersMapObject,
  reduce: (
    state: StateSchema,
    actions: AnyAction,
  ) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  getMountedReducers: () => MountedReducers;
}

export type ReduxStoreWithManager = {
  reducerManager: ReducerManager;
} & EnhancedStore<StateSchema>;

export interface ThunkExtraArg {
  api: AxiosInstance,
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg
}
