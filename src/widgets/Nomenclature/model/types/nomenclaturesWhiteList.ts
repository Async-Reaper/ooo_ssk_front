export interface NomenclaturesWhiteListSchema {
  data?: INomenclaturesWhiteList[];
  isLoading?: boolean;
  error?: string;
}

export interface INomenclaturesWhiteList {
  guid: string
  short_name: string
  expiration_date: number
  measurement: string
}
