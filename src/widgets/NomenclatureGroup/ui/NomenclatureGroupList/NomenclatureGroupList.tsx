import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@shared/hooks";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { AppImage, Typography } from "@shared/ui";
import { getRouteMain } from "@shared/const/router";
import { getSidebarCollapsed } from "@features/UI";
import { searchProductActions } from "@features/SearchProduct";
import { __API__ } from "@shared/protocols/api";
import { getNomenclatureGroupData } from "../../model/selectors/nomenclatureGroupSelectors";
import { fetchNomenclatureGroup } from "../../model/services/fetchNomenclatureGroup";
import { nomenclatureGroupReducer } from "../../model/slice/nomenclatureGroupSlice";
import { NomenclatureGroupParent } from "../NomenclatureGroupParent/NomenclatureGroupParent";
import cls from "./NomenclatureGroupList.module.scss";

const reducers: ReducersList = {
  nomenclatureGroupList: nomenclatureGroupReducer,
};

type ChildComponentProps = {
  blockVisible: boolean;
  onVisibleChange: (newState: boolean) => void;
};

const Component: React.FC<ChildComponentProps> = ({ blockVisible, onVisibleChange }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isShowSidebar = useSelector(getSidebarCollapsed);
  const currentGroups = useSelector(getNomenclatureGroupData);
  const httpQuery = new URLSearchParams(location.search);
  // const isLoading = useSelector(getNomenclatureGroupIsLoading);

  useEffect(() => {
    dispatch(fetchNomenclatureGroup());
  }, [dispatch]);

  const handleBlockVisibleClick = (isNew: boolean) => {
    httpQuery.delete("parentGUID");
    httpQuery.delete("brandGUID");
    httpQuery.delete("isOnlyMatrix");
    isNew 
      ? httpQuery.set("isNew", "true")
      : httpQuery.delete("isNew");
    dispatch(searchProductActions.setSearchValue(""));
    navigate({
      pathname: getRouteMain(),
      search: `${httpQuery}`,
    });
    onVisibleChange(!blockVisible);
  };

  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={reducers}
    >
      <div className={isShowSidebar
        ? cls.group__products
        : cls.group__sidebar}
      >
        <div className={cls.group_wrap} onClick={() => handleBlockVisibleClick(true)}>
          <AppImage src={`${__API__}/static/nomenclature_groups/news/novelty.png`} />
          <Typography variant="h4">Новинки</Typography>
        </div>
        {/* новинки */}
        {/* акционный товары */}
        {currentGroups?.map((groupParent) => (
          <div key={groupParent.object.guid}>
            <NomenclatureGroupParent 
              key={groupParent.object.guid}
              picture={groupParent.object.picture}
              fullname={groupParent.object.fullname} 
              parentGUID={groupParent.object.guid} 
              subject={groupParent.subject}
              blockVisible={blockVisible}
              onVisibleChange={onVisibleChange}
              isMatrix={false}
            />
          </div>
        ))}
        <div className={cls.group_wrap}>
          <div onClick={() => handleBlockVisibleClick(false)}>
            <Typography variant="h4">Весь ассортимент</Typography>
          </div>
        </div>
      </div>
    </DynamicModuleLoader>
  );
};

export const GroupList = React.memo(Component);
