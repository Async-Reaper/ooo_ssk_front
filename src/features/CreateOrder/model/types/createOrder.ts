export interface ICreateOrder {
  header: ICreateOrderHeader
  products: ICreateOrderProduct[]
}

export interface ICreateOrderHeader {
  contractGUID: string;
  dateshipment: string;
  userGUID: string;
  comment?: string
}

export interface ICreateOrderProduct {
  product_guid: string;
  count: number
}

export interface CreateOrderSchema {
  message?: string;
  isLoading: boolean;
  error?: IResponseError;
}
