declare interface IResponse<T> {
  data: T;
  isArray: boolean;
  path: string;
  duration: string;
  method: string;
  requestCount: number | null;
}

interface IFilterNomenclatures {
  limit?: number;
  page: number;
  isNew?: boolean;
  brandGuid?: string;
  isDiscount?: boolean;
  parentGuid?: string;
  isOnlyMatrix?: boolean;
  contractGuid?: string;
  titleProduct?: string;
}

interface IPaginationParams<T> extends IFilterNomenclatures{
  limit?: number;
  page: number;
  data: T;
}

type Errors = "Unauthorized";
interface IResponseError {
  message: string;
}
