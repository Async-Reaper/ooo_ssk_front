export interface OrderHeaderSchema {
  data?: IOrderHeader;
  isLoading: boolean;
  error?: IResponseError;
}
 
export interface IOrderHeader {
  number : string,
  comment?: string,
  date : string,
  dateShipment : string,
  contractName : string,
  approved : boolean,
  amount : number,
  is_new : boolean,
  contractGUID : string,
  documentGUID : string,
}
