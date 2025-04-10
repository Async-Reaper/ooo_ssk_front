import { INomenclature } from "./nomenclature";

export interface NomenclaturesListSchema {
  isLoading: boolean;
  error?: IResponseError;
  total_count_products?: number;
  count_products?: number;
  products?: INomenclature[];
}

export interface NomenclatureListData {
  total_count_products: number;
  count_products: number;
  products: INomenclature[]
}
