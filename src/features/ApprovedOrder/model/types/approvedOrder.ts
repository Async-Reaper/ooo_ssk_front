export interface IApprovedOrder {
  header: IApprovedOrderHeader
  products: IApprovedOrderProduct[]
}

export interface IApprovedOrderHeader {
  documentGUID: string;
  dateshipment: string;
  userGUID: string;
}

export interface IApprovedOrderProduct {
  product_guid?: string;
  count?: number
}

export interface ApprovedOrderSchema {
  message?: string;
  isLoading: boolean;
  error?: IResponseError;
}
