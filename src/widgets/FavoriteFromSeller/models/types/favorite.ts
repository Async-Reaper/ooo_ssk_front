export interface IFavorite {
  picture_path: string;
  user_name: string; 
  user_guid: string; 
  product_guid: string;
  product_title: string;
  nomenclature_data: any;
  path: string;
}

export interface FavoriteSchem {
  isLoading: boolean;
  error?: IResponseError;
  data?: IFavorite[]
}
