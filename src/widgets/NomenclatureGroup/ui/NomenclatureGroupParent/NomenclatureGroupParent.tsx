import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NomenclatureGroupType } from "@features/NomenclatureGroupSelect";
import { Typography } from "@shared/ui";
import { getRouteMain } from "@shared/const/router";
import { useAppDispatch } from "@shared/hooks";
import { searchProductActions } from "@features/SearchProduct";
import cls from "./NomenclatureGroupParent.module.scss";
import { NomenclatureGroupChild } from "../NomenclatureGroupChild/NomenclatureGroupChild";

interface nomenclatureGroupParentProps {
  fullname?: string;
  parentGUID?: string;
  subject?: NomenclatureGroupType[]
  blockVisible: boolean;
  onVisibleChange: (newState: boolean) => void;
}

const Component = ({
  fullname,
  subject,
  parentGUID,
  blockVisible,
  onVisibleChange,
} : nomenclatureGroupParentProps) => {
  const [showChild, setShowChild] = useState(false);

  const handleBlockVisibleClick = () => {
    onVisibleChange(!blockVisible);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onOpenSelect = () => {
    if (subject && subject.length > 0) {
      setShowChild(!showChild);
    } else {
      const httpQuery = new URLSearchParams(location.search);
      httpQuery.set("parentGUID", parentGUID!);
      httpQuery.delete("brandGUID");
      navigate({
        pathname: getRouteMain(),
        search: `${httpQuery}`,
      });
      onVisibleChange(!blockVisible);
      dispatch(searchProductActions.setSearchValue(""));
    }
  };

  return (
    <>
      <div className={cls.group_wrap} onClick={onOpenSelect}>
        <Typography variant="h4">{fullname}</Typography>
      </div>
      {showChild
         && (
           <div className={cls.subgroup_wrap} onClick={handleBlockVisibleClick}>
             {subject?.map((groupChild) => (
               <NomenclatureGroupChild 
                 key={groupChild.guid}
                 guid={groupChild.guid}
                 fullname={groupChild.fullname}
               />
             ))}
           </div>
         )}
    </>
  );
};

export const NomenclatureGroupParent = React.memo(Component);
