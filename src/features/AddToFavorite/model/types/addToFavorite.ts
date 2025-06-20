import { IFavorite } from "@entities/FavoriteProducts";

export interface IAddToFavorite {
  user_guid: string;
  user_name: string;
  product_guid: string;
  currentTradePoint: string
}

export interface AddToFavoriteSchema {
  isLoading: boolean;
  data?: IFavorite;
  textResponse: string;
  errors?: IResponseError;
}
