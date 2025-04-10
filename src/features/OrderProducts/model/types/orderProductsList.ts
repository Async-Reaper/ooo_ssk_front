export interface IOrderProductsList {
  products: IOrderProductsCard[];
  total_count_products: number;
}

export interface IOrderProductsCard {
  product_guid: string;
  count: number;
  price: number;
  amount: number;
}

export interface OrderProductsListSchema {
  data?: IOrderProductsList;
  isLoading: boolean;
  error?: IResponseError;
}
