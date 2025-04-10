export interface IHistoryOrderProduct {
  arrayOfOrders?: IOrder[];
  productItem?: string;
  contractGUID?: string;
}

export interface HistoryOrderProductSchema {
  data?: IHistoryOrderProduct;
  isLoading: boolean;
  error?: IResponseError;
  textMessage?: string;
}

export interface IOrder {
  document_guid?: string;
  number?: string;
  date?: string;
  quantity?: number;
  price?: number;
  sum?: number;
}
