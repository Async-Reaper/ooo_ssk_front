import { ISellerOrder } from "../../../../entities/SellerOrders";

export interface AddToSellerDataSchema {
  data?: ISellerOrder;
  isLoading: boolean;
  errors?: IResponseError
  textResponse?: string;
}
