import { memo } from "react";

import { AppLink, Typography } from "@shared/ui";
import { classNames, Mods } from "@shared/libs/classNames/classNames";
import cls from "./SidebarItem.module.scss";

import { type SidebarItemType } from "../../model/types/sidebar";

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const mods: Mods = {
    [cls.collapsed]: collapsed,
  };

  return (
    <AppLink
      to={item.path}
      className={classNames(cls.item, mods)}
      activeClassName={cls.active}
    >
      <span className={cls.link}>
        <Typography variant="h3">{item.text}</Typography>
      </span>
    </AppLink>
  );
});
