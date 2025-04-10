import React from "react";
import { AppLink, Typography } from "@shared/ui";
import cls from "./NomenclatureGroupSelect.module.scss";
import { NomenclatureGroupItemType } from "../model/types/nomenclatureGroup";

interface SelectBodyProps {
  item: NomenclatureGroupItemType;
}

const Component = ({ item }: SelectBodyProps) => (
  <div key={item.id} className={cls.select__item} onClick={(event) => event.stopPropagation()}>
    <AppLink to="/nomenclatures">
      <Typography variant="h4">{item.name}</Typography>
    </AppLink>
  </div>
);

export const NomenclatureGroupSelectItem = React.memo(Component);
