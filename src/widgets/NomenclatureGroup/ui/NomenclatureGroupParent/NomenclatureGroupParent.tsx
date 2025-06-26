import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NomenclatureGroupType } from "@features/NomenclatureGroupSelect";
import { AppImage, Typography } from "@shared/ui";
import { getRouteMain } from "@shared/const/router";
import { useAppDispatch } from "@shared/hooks";
import { searchProductActions } from "@features/SearchProduct";
import { __API__ } from "@shared/protocols/api";
import cls from "./NomenclatureGroupParent.module.scss";
import { NomenclatureGroupChild } from "../NomenclatureGroupChild/NomenclatureGroupChild";

interface NomenclatureGroupParentProps {
  // guid: string;
  fullname?: string;
  parentGUID?: string;
  subject?: NomenclatureGroupType[]
  blockVisible: boolean;
  isMatrix: boolean;
  onVisibleChange: (newState: boolean) => void;
}

const Component = ({
  // guid,
  fullname,
  subject,
  parentGUID,
  blockVisible,
  isMatrix,
  onVisibleChange,
} : NomenclatureGroupParentProps) => {
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
      httpQuery.delete("isNew");
      isMatrix 
        ? httpQuery.set("isOnlyMatrix", "true") 
        : httpQuery.delete("isOnlyMatrix");

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
        {/* <AppImage src={`${__API__}/templates/static/nomenclature_groups/${parentGUID}/${guid}.png`} /> */}
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
                 isMatrix={isMatrix}
               />
             ))}
           </div>
         )}
    </>
  );
};

export const NomenclatureGroupParent = React.memo(Component);
