import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@shared/ui";
import { getRouteMain } from "@shared/const/router";
import { uiActions } from "@features/UI";
import { useAppDispatch } from "@shared/hooks";
import { searchProductActions } from "@features/SearchProduct";
import cls from "./NomenclatureGroupChild.module.scss";

interface NomenclatureGroupChildProps {
  fullname?: string; 
  guid?: string; 
  isMatrix: boolean;
}

const Component = ({
  fullname,
  guid,
  isMatrix,
} : NomenclatureGroupChildProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleParent = useCallback(() => {
    const httpQuery = new URLSearchParams(location.search);
    httpQuery.set("parentGUID", guid!);
    isMatrix 
      ? httpQuery.set("isOnlyMatrix", "true") 
      : httpQuery.delete("isOnlyMatrix");

    httpQuery.delete("isNew");
    httpQuery.delete("brandGUID");
    navigate({
      pathname: getRouteMain(),
      search: `${httpQuery}`,
    });
    dispatch(searchProductActions.setSearchValue(""));
    dispatch(uiActions.setSidebarCollapsed(false));
  }, [isMatrix]);
 
  return (

    <div className={cls.subgroup_wrap} onClick={handleParent}>
      <Typography className={cls.text_subgroup} variant="h5">
        { fullname! }
      </Typography>
    </div>

  ); 
};

export const NomenclatureGroupChild = React.memo(Component);
