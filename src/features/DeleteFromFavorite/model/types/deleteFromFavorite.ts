export interface IDeleteFromFavorite {
  userGuid: string;
  productGuid: string;
  currentTradePoint: string
}

export interface DeleteFromFavoriteSchema {
  productGuid?: string;
  isLoading: boolean;
  textResponse?: string;
  errors?: IResponseError;
}
