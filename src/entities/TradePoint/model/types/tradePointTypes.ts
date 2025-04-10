export interface TradePointSchema {
  currentPoint?: ITradePoint;
  data?: ITradePoint[]
  isLoading: boolean;
  errors?: IResponseError;
}

export interface ITradePoint {
  guid: string;
  fullname: string;
  counterparty_guid: string;
  counterparty_name: string;
  organization_guid: string;
  organization_name: string;
  representative_guid: string;
  representative_name: string;
  representative_phone: string;
  is_deleted: boolean,
  see_only_your_matrix: boolean
}
