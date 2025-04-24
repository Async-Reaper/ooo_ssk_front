export interface AuthTypes {
  login: string;
  password: string;
}

export interface AuthSchema {
  isLoading: boolean;
  isSuccess: boolean;
  error?: IResponseError;
  JWT?: string;
  matrix?: string[];
}
