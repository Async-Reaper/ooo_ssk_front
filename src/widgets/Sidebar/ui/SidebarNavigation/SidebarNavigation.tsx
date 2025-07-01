import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography } from "@shared/ui";
import { UserRoles, getUserAuthData } from "@entities/user";
import { GroupList, GroupListMatrix } from "@widgets/NomenclatureGroup";
import { useAppDispatch } from "@shared/hooks";
import { uiActions } from "@features/UI";
import cls from "./SidebarNavigation.module.scss";
import { links } from "../../model/data/links";

const Component = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const httpQuery = new URLSearchParams(location.search);
  const userRole = useSelector(getUserAuthData)?.role;
  const blockRefMatrix = useRef<HTMLDivElement>(null);
  const blockRefAssort = useRef<HTMLDivElement>(null);
  const [blockVisibleMatrix, setBlockVisibleMatrix] = useState(false);
  const [blockVisibleAssort, setBlockVisibleAssort] = useState(false);

  const handleVisibleChangeMatrix = () => {   
    setBlockVisibleMatrix(!blockVisibleMatrix);
  };

  const handleVisibleChangeAssort = () => {
    setBlockVisibleAssort(!blockVisibleAssort);
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
      <div ref={blockRefMatrix}>
        <div className={cls.bar_text} onClick={handleVisibleChangeMatrix}>
          <Typography variant="h3">Матрица</Typography>
        </div>
        {blockVisibleMatrix
          && (
            <div className={cls.groups}>
              <GroupListMatrix blockVisible={blockVisibleMatrix} onVisibleChange={handleVisibleChangeMatrix} />
            </div>
          )}
      </div>
      <hr className={cls.link__underline}/>
      <div ref={blockRefAssort}>
        <div className={cls.bar_text} onClick={handleVisibleChangeAssort}>
          <Typography variant="h3">Ассортимент</Typography>
        </div>
        {blockVisibleAssort
          && (
            <div className={cls.groups}>
              <GroupList blockVisible={blockVisibleAssort} onVisibleChange={handleVisibleChangeAssort} />
            </div>
          )}
      </div>
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
