export interface BrandsListType{
  guid : string;
  fullname : string;
  pictures : BrandsPictures[];
}

export interface IBrandsListResponse {
  total_count_brands: number;
  brands: BrandsListType[];
}

export interface BrandsListSchema{
  data? : IBrandsListResponse;
  isLoading : boolean;
  error?: IResponseError; 
}

export interface BrandsPictures{
  guid_object:string;
  path:string;
  picture_type:string;
  picture_category:string;
  file_name:string;
}
