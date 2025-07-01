import { IconName } from "@shared/libs/icons/smiles";

export interface NomenclatureGroupSchema {
  isLoading: boolean;
  errors?: IResponseError
  data?: NomeclatureGroupListType[];
}

export interface NomenclatureGroupItemType {
  id: number;
  name: string;
  icon?: IconName;
  itemsSelect?: NomenclatureGroupType;
}

export interface NomeclatureGroupListType {
  object : NomenclatureGroupType;
  subject : NomenclatureGroupType[];
}

export interface NomenclatureGroupType {
  parent_guid: string,
  guid: string,
  fullname: string,
  picture: string,
  is_deleted: boolean
}
