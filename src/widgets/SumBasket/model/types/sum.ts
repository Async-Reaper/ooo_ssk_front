export interface ISumBasket {
  countProduct: number;
  sumOrder: number;
}

export interface OsumBasket {
  userGuid: string;
  contractGuid: string;
}

export interface SumBasketShema {
  isLoading: boolean;
  error?: IResponseError;
  data?: ISumBasket
}

export interface StateSumBasket{
  sumBasket?: number;
}
