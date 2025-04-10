export interface OrdersListSchema {
  isLoading: false,
  error?: IResponseError;
  total_count_products?: number;
  orders?: IOrdersList[];
}

export interface OrdersListData {
  total_count_products: number;
  orders: IOrdersList[]
}

export interface IOrdersList {
  buyerName : string;
  contractName : string;
  contractGUID : string;
  amount : number;
  countDocuments : number;
  approvedDocuments : number;
  documents: IDocumentInfo[];
}

export interface IDocumentInfo {
  number: string;
  documentGUID: string;
  date: string;
  dateShipment: string;
  amount: number;
  approved: boolean;
  is_new: boolean;
}
