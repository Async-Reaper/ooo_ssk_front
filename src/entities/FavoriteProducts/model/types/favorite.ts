export interface IFavorite {
  id?: number;
  user_guid: string
  product_guid: string
}

export interface FavoriteSchema {
  data?: IFavorite[],
  isLoading: boolean;
  errors?: IResponseError;
}

export interface SendData{
  userGuid: string;
  contractGuid: string | null;
}
