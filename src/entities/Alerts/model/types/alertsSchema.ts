export type AlertType = "success" | "error" | "info";

export interface IAlert {
  id: number;
  type: AlertType;
  title: string;
  text: string;
}

export interface AlertSchema {
  alerts: IAlert[];
  _inited: boolean;
}
