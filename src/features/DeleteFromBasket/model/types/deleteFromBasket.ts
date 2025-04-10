export interface IDeleteFromBasket {
  userGuid: string;
  contractGuid: string;
  productGuid: string;
}

export interface DeleteFromBasketSchema {
  data?: BasketInfo;
  productGuid?: string;
  isLoading: boolean;
  errors?: IResponseError
}

export interface BasketInfo {
  countBasket: number
}
