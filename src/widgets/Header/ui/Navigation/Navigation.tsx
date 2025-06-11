import { UserRoles, getUserRole } from "@entities/user";
import {
  getRouteBrands, getRouteFavorites, getRouteHistory,
} from "@shared/const/router";
import { AppLink, Typography } from "@shared/ui";
import { GroupList, GroupListMatrix } from "@widgets/NomenclatureGroup";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cls from "./Navigation.module.scss";

const Component: React.FC = () => {
  const userRole = useSelector(getUserRole);
  const navigate = useNavigate();

  const blockRef = useRef<HTMLDivElement>(null);
  const [blockVisibleMatrix, setBlockVisibleMatrix] = useState(false);
  const [blockVisibleAssort, setBlockVisibleAssort] = useState(false);

  const handleVisibleChangeMatrix = () => {   
    setBlockVisibleMatrix(!blockVisibleMatrix);
  };

  const handleVisibleChangeAssort = () => {
    setBlockVisibleAssort(!blockVisibleAssort);
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
        setBlockVisibleMatrix(false);
        setBlockVisibleAssort(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cls.navigation}>
      {/* <Conditions condition={userRole === UserRoles.SELLER && }>

      </Conditions> */}
      <div>
        <div className={cls.select__button} onClick={handleVisibleChangeMatrix}>
          <Typography className={cls.assort} variant="h4">Матрица</Typography>
        </div>
        {blockVisibleMatrix
          && (
            <div ref={blockRef} className={cls.groups}>
              <GroupListMatrix blockVisible={blockVisibleMatrix} onVisibleChange={handleVisibleChangeMatrix} />
            </div>
          )}
      </div>
      <div>
        <div ref={blockRef} className={cls.select__button} onClick={handleVisibleChangeAssort}>
          <Typography className={cls.assort} variant="h4">Ассортимент</Typography>
        </div>
        {blockVisibleAssort
          && (
            <div className={cls.groups}>
              <GroupList blockVisible={blockVisibleAssort} onVisibleChange={handleVisibleChangeAssort} />
            </div>
          )}
      </div>
      {(userRole === UserRoles.BUYER && (
        <>
          <AppLink to={getRouteBrands()}>
            <Typography className={cls.assort} variant="h4">Бренды</Typography>
          </AppLink>
          <AppLink to={getRouteFavorites()}>
            <Typography className={cls.assort} variant="h4">Избранные</Typography>
          </AppLink>
        </>
      ))}
      {userRole === UserRoles.BUYER && (
        <div className={cls.history__link} onClick={() => handleClickLink(getRouteHistory())}>
          <Typography align="center" variant="h4">История заказов</Typography>
        </div>
      )}
    </div>
  );
};

export const Navigation = React.memo(Component);
