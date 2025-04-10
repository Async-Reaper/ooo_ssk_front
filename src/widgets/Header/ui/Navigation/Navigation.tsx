import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getRouteBrands, getRouteFavorites, getRouteHistory,
} from "../../../../shared/const/router";
import { UserRoles, getUserRole } from "../../../../entities/user";
import { Typography } from "../../../../shared/ui";
import cls from "./Navigation.module.scss";
import { GroupList } from "../../../NomenclatureGroup/ui/NomenclatureGroupList/NomenclatureGroupList";

const Component: React.FC = () => {
  const userRole = useSelector(getUserRole);
  const navigate = useNavigate();
  const blockRef = useRef<HTMLDivElement>(null);
  const [blockVisible, setBlockVisible] = useState(false);

  const handleVisibleChange = (newState: boolean) => {
    setBlockVisible(newState);
  };

  const handleClickLink = (route: string) => {
    const httpQuery = new URLSearchParams(location.search);
    navigate({
      pathname: route,
      search: `${httpQuery.toString()}`,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (blockRef.current && !blockRef.current.contains(event.target as Node)) {
        setBlockVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={cls.navigation}>

      {userRole === UserRoles.BUYER && (
        <div onClick={() => { handleClickLink(getRouteHistory()); }}>
          <Typography className={cls.assort} align="center" variant="h3">История заказов</Typography>
        </div>
      )}
      <div>
        <div onClick={() => setBlockVisible(!blockVisible)}>
          <Typography className={cls.assort} variant="h3">Ассортимент</Typography>
        </div>
        {blockVisible
               && (
                 <div className={cls.groups} ref={blockRef}>
                   <GroupList blockVisible={blockVisible} onVisibleChange={handleVisibleChange} />
                 </div>

               )}
      </div>

      <>
        <div onClick={() => { handleClickLink(getRouteBrands()); }}>
          <Typography className={cls.assort} variant="h3">Бренды</Typography>
        </div>
        {(userRole === UserRoles.BUYER && (
          <div onClick={() => { handleClickLink(getRouteFavorites()); }}>
            <Typography className={cls.assort} variant="h3">Избранные</Typography>
          </div>
        ))}
      </>
    </div>
  );
};

export const Navigation = React.memo(Component);
