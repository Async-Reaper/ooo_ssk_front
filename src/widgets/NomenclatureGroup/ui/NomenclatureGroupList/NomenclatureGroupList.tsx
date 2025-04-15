import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@shared/hooks";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { Typography } from "@shared/ui";
import { getRouteMain } from "@shared/const/router";
import { getSidebarCollapsed, uiActions } from "@features/UI";
import { searchProductActions } from "@features/SearchProduct";
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
  // const isLoading = useSelector(getNomenclatureGroupIsLoading);
  useEffect(() => {
    dispatch(fetchNomenclatureGroup());
  }, [dispatch]);

  const handleBlockVisibleClick = () => {
    const httpQuery = new URLSearchParams(location.search);
    httpQuery.delete("parentGUID");
    httpQuery.delete("brandGUID");
    dispatch(searchProductActions.setSearchValue(""));
    navigate({
      pathname: getRouteMain(),
      search: `${httpQuery}`,
    });
    onVisibleChange(!blockVisible);
    !isShowSidebar && dispatch(uiActions.setSidebarCollapsed(true));
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

        <div className={cls.group_wrap}>
          <div onClick={handleBlockVisibleClick}>
            <Typography variant="h4">Весь ассортимент</Typography>
          </div>
        </div>

        {/* новинки */}
        {/* акционный товары */}
        {currentGroups?.map((groupParent) => (
          <div key={groupParent.object.guid}>
            <NomenclatureGroupParent 
              key={groupParent.object.guid}
              fullname={groupParent.object.fullname} 
              parentGUID={groupParent.object.guid} 
              subject={groupParent.subject}
              blockVisible={blockVisible}
              onVisibleChange={onVisibleChange}
            />
          </div>
        ))}
      </div>
    </DynamicModuleLoader>
  );
};

export const GroupList = React.memo(Component);
