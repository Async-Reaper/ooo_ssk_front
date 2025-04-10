export interface IOrderProductsHistoryList {
  products: IOrderProductsHistoryCard[];
  total_count_products: number;
}

export interface IOrderProductsHistoryCard {
  product_guid: string;
  count: number;
  price: number;
  amount: number;
}

export interface OrderProductsHistoryListSchema {
  data?: IOrderProductsHistoryList;
  isLoading: boolean;
  error?: IResponseError;
}
