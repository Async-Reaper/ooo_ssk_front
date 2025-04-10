export interface IHistoryOrdersRequest {
  startDate: string;
  endDate: string;
  contractGUID: string;
}

export interface IHistoryOrders {
  number: string;
  documentGUID: string;
  date: string;
  dateshipment: string;
  amount: number;
  approved: boolean;
}

export interface HistoryOrdersListSchema {
  data?: IHistoryOrders[];
  isLoading: boolean;
  error?: string;
}
export interface selectDateSchema {
  beginDate: string;
  endDate: string;
}
