export enum StatusNomenclatureType {
  IN_STOCK = "in_stock",
  IN_TRANSIT = "in_transit",
  IS_NOT_MATRIX = "is_not_matrix"
}

export interface INomenclature {
  guid: string;
  short_name: string;
  full_name: string;
  description: string;
  expiration_date: number;
  measurement: string;
  weight: number;
  multiplicity: number;
  is_deleted: boolean;
  is_discount: boolean;
  is_new: boolean;
  brand_guid: string;
  parent_guid: string;
  pictures: INomenclaturePicture[];
  path?: string;
  additional_information : INomenclatureInformation;
  status: StatusNomenclatureType;
}

interface INomenclatureInformation {
  product_guid: string;
  remains: number;
  count: number;
  price: number;
}

interface INomenclaturePicture {
  id: number;
  guid_product: string;
  path: string;
  full_name: string;
}

export interface NomenclatureSchema {
  isLoading: boolean;
  error?: IResponseError;
  data?: INomenclature;
  list?: INomenclature[];
}
