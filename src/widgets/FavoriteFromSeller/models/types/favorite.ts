import { INomenclature } from "@widgets/Nomenclature";

export interface IFavorite {
  user_name: string; 
  user_guid: string; 
  contract_guid: string;
  products: IFavoriteProducts[];
}

export interface IFavoriteProducts {
  product_guid: string;
  product_title: string;
  nomenclature_data: INomenclature;
}

export interface FavoriteSellerSchema {
  isLoading: boolean;
  error?: IResponseError;
  data?: IFavorite[]
}
