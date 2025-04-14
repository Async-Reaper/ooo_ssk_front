import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getRouteBrands, getRouteFavorites, getRouteHistory,
} from "@shared/const/router";
import { UserRoles, getUserRole } from "@entities/user";
import { AppLink, Typography } from "@shared/ui";
import { GroupList } from "@widgets/NomenclatureGroup";
import cls from "./Navigation.module.scss";

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
        <div onClick={() => handleClickLink(getRouteHistory())}>
          <Typography align="center" variant="h4">История заказов</Typography>
        </div>
      )}
      <div>
        <div onClick={() => setBlockVisible(!blockVisible)}>
          <Typography className={cls.assort} variant="h4">Ассортимент</Typography>
        </div>
        {blockVisible
          && (
            <div className={cls.groups} ref={blockRef}>
              <GroupList blockVisible={blockVisible} onVisibleChange={handleVisibleChange} />
            </div>

          )}
      </div>

      <>
        <AppLink to={getRouteBrands()}>
          <Typography className={cls.assort} variant="h4">Бренды</Typography>
        </AppLink>
        {(userRole === UserRoles.BUYER && (
          <AppLink to={getRouteFavorites()}>
            <Typography className={cls.assort} variant="h4">Избранные</Typography>
          </AppLink>
        ))}
      </>
    </div>
  );
};

export const Navigation = React.memo(Component);
