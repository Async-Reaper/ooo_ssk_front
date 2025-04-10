import { UserRoles } from "@entities/user";

export interface UserSchema {
  _inited: boolean;
  isLoading: boolean;
  error?: string;
  data?: UserDataType
}

export interface UserDataType {
  userGUID: string;
  role: UserRoles;
  exp: number;
  user_info?: IUserInfo;
}

interface IUserInfo {
  username: string;
  is_onlymatrix: boolean;
  orders?: IOrdersInfo[];
}

export interface IOrdersInfo {
  buyerName : string;
  contractName : string;
  contractGUID : string;
  amount : number;
  countDocuments : number;
  approvedDocuments : number;
  documents: IDocumentInfo[];
}

export interface IDocumentInfo {
  number: string;
  documentGUID: string;
  date: string;
  dateShipment: string;
  amount: number;
  approved: boolean;
  is_new: boolean;
}
