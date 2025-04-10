export interface DebtsSchema {
  data?: IDebtsData;
  isLoading: boolean;
  errors?: IResponseError
  textResponse?: string;
}

export interface IDebtsData {
  totalDebts?: number;
  totalCount?: number;
  debts?: IDebt[];
}

interface IDebt {
  documentGUID?: string;
  date?: string;
  number?: string;
  amount?: number;
  amountDebt?: number;
  daysNotPaid?: number;
}
