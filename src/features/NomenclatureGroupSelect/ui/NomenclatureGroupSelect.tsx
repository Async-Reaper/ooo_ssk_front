import React, { useState } from "react";
import { Typography } from "@shared/ui";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import cls from "./NomenclatureGroupSelect.module.scss";
import { NomenclatureGroupType } from "../model/types/nomenclatureGroup";
import { nomenclatureGroupReducer } from "../model/slice/nomenclatureGroupSlice";

interface SelectProps {
  select: NomenclatureGroupType;
}

const reducers: ReducersList = {
  nomenclatureGroupList: nomenclatureGroupReducer,
};

const Component = ({ select }: SelectProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onOpenSelect = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={reducers}
    >
      <div className={cls.select__wrapper} onClick={onOpenSelect}>
        <Typography variant="h3">{select.fullname}</Typography>
      </div>
    </DynamicModuleLoader>
  );
};

export const NomenclatureGroupSelect = React.memo(Component);
