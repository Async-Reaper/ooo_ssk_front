import { ISellerOrder } from "@entities/SellerOrders";

export interface DeleteFromSellerDataSchema {
  data?: ISellerOrder[]
  isLoading: boolean;
  errors?: IResponseError;
}
