import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@shared/hooks";
import { getSidebarCollapsed, uiActions } from "@features/UI";
import { Icon } from "@shared/libs/icons";
import cls from "./styles.module.scss";

const Component = () => {
  const dispatch = useAppDispatch();
  const isCollapsed = useSelector(getSidebarCollapsed);

  const onChangeCollapsedSidebar = () => dispatch(uiActions.setSidebarCollapsed(!isCollapsed));

  return (
    <div className={cls.sidebarButton__wrapper}>
      <button 
        className={cls.sidebarButton}
        onClick={onChangeCollapsedSidebar}
      >
        <Icon name="burger" size={30} />
      </button>
    </div>
  );
};

export const SidebarButton = React.memo(Component);
