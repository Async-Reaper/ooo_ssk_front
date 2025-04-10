// <Адрес страницы, позиция скролла>
export type ScrollSchema = Record<string, number>;

export type SidebarSchema = boolean;

export interface UISchema {
  scroll: ScrollSchema;
  sidebarCollapsed: SidebarSchema;
}
