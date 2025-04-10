import { INomenclature } from "@widgets/Nomenclature";

export interface IBasket {
  user_guid: string;
  contract_guid: string;
  product_guid: string;
  count: number;
  price: number;
  other_data: INomenclature;
}

export interface BasketSchema {
  orderSum: number
  products?: IBasket[];
  count: number;
  isLoading: boolean;
  errors?: IResponseError;
}

export interface IBasketData {
  products: IBasket[]
  order_sum: number
}
