export interface GetSellerDataSchema {
  data?: IGetSellerData;
  isLoading: boolean;
  errors?: IResponseError
  textResponse?: string;
}

export interface IGetSellerData {
  user_guid: string
  document_guid: string
  document_data: DocumentData
}
 
export interface DocumentData {
  document_header?: DocumentHeader
  products?: Product[]
}
 
export interface Product {
  product_guid: string
  amount?: number
  count: number
  price: number
}

export interface DocumentHeader {
  documentGUID: string
  number: string
  date: string
  dateShipment: string
  contractName: string
  contractGUID: string
  approved: boolean
  products_count?: number
  comment?: string;
  amount?: number
}
