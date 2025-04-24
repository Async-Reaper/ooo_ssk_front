import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography } from "@shared/ui";
import { UserRoles, getUserAuthData } from "@entities/user";
import { GroupList } from "@widgets/NomenclatureGroup";
import { useAppDispatch } from "@shared/hooks";
import { uiActions } from "@features/UI";
import cls from "./SidebarNavigation.module.scss";
import { links } from "../../model/data/links";

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
    navigate({
      pathname: link,
      search: `${httpQuery}`,
    });
    dispatch(uiActions.setSidebarCollapsed(false));
  };

  return (
    <div className={cls.navigation}>
      {(userRole === UserRoles.BUYER && (
        <div onClick={() => setBlockVisible(!blockVisible)}>
          <Typography className={cls.bar_text} variant="h3">Матрица</Typography>
        </div>
      ))}
      {blockVisible
        && (
          <div className={cls.groups} ref={blockRef}>
            <GroupList blockVisible={blockVisible} onVisibleChange={handleVisibleChange}/>
          </div>
        )}
      <hr className={cls.link__underline}/>
      <div onClick={() => setBlockVisible(!blockVisible)}>
        <Typography className={cls.bar_text} variant="h3">Ассортимент</Typography>
      </div>
      {blockVisible
        && (
          <div className={cls.groups} ref={blockRef}>
            <GroupList blockVisible={blockVisible} onVisibleChange={handleVisibleChange}/>
          </div>
        )}
      <hr className={cls.link__underline}/>
      {userRole === UserRoles.BUYER && (
        links.map((link) => (
          <>
            <div key={link.id} onClick={() => onHandleRoutePage(link.path)}>
              <Typography className={cls.bar_text} variant="h3">{link.name}</Typography>
            </div>
            <hr className={cls.link__underline}/>
          </>
        ))
      )}
    </div>
  );
};

export const SidebarNavigation = React.memo(Component);
