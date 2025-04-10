import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography } from "../../../../shared/ui";
import {
  getRouteBrands, getRouteFavorites, getRouteHistory, 
} from "../../../../shared/const/router";
import { UserRoles, getUserAuthData } from "../../../../entities/user";
import cls from "./SidebarNavigation.module.scss";
import { GroupList } from "../../../../widgets/NomenclatureGroup/ui/NomenclatureGroupList/NomenclatureGroupList";
import { useAppDispatch } from "../../../../shared/hooks";
import { uiActions } from "../../../../features/UI";

const Component = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const httpQuery = new URLSearchParams(location.search);
  const userRole = useSelector(getUserAuthData)?.role;
  const blockRef = useRef<HTMLDivElement>(null);
  const [blockVisible, setBlockVisible] = useState(false);
  const handleVisibleChange = (newState: boolean) => {
    setBlockVisible(newState);
  };

  const onHandleRoutePage = (link : string) => {
    dispatch(uiActions.setSidebarCollapsed(true));
    navigate({
      pathname: link,
      search: `${httpQuery}`,
    });
  };

  return (
    <div className={cls.navigation}>

      <hr className={cls.blue_line} />

      <div onClick={() => setBlockVisible(!blockVisible)}>
        <Typography className={cls.bar_text} variant="h1">Ассортимент</Typography>
      </div>
      {blockVisible
               && (
                 <div className={cls.groups} ref={blockRef}>
                   <GroupList blockVisible={blockVisible} onVisibleChange={handleVisibleChange} />
                 </div>
               )}

      <hr className={cls.red_line} />

      {userRole === UserRoles.BUYER && (
        <>
          <div onClick={() => {
            onHandleRoutePage(getRouteBrands());
          }}
          >
            <Typography className={cls.bar_text} variant="h1">Бренды</Typography>
          </div>

          <hr className={cls.blue_line} />

          <div onClick={() => {
            onHandleRoutePage(getRouteHistory());
          }}
          >
            <Typography className={cls.bar_text} variant="h1">История заказов</Typography>
          </div>

          <hr className={cls.red_line} />

          <div onClick={() => {
            onHandleRoutePage(getRouteFavorites());
          }}
          >
            <Typography className={cls.bar_text} variant="h1">Избранные</Typography>
          </div>

          <hr className={cls.blue_line} />
        </>
      )}
         
    </div>
  );
};

export const SidebarNavigation = React.memo(Component);
