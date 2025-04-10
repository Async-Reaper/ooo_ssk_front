import { memo, type ReactNode } from "react";
import { type LinkProps, NavLink } from "react-router-dom";

import { classNames } from "@shared/libs/classNames/classNames";
import cls from "./AppLink.module.scss";

export type AppLinkVariant = "primary" | "blue";

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  children?: ReactNode;
  activeClassName?: string;
}

export const AppLink = memo((props: AppLinkProps) => {
  const {
    to,
    className,
    children,
    variant = "primary",
    activeClassName = "",
    ...otherProps
  } = props;

  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(cls.AppLink, { [activeClassName]: isActive }, [
        className,
        cls[variant],
      ])}
      {...otherProps}
    >
      {children}
    </NavLink>
  );
});
