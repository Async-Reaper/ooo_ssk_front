export interface AddToBasketSchema {
  basketInfo?: BasketInfo;
  data?: AddToBasketData
  isLoading: boolean;
  textResponse?: string;
  errors?: IResponseError;
}

export interface AddToBasketData {
  user_guid: string;
  contract_guid: string;
  product_guid: string;
  count: number;
}

export interface BasketInfo {
  countBasket : number;
}
