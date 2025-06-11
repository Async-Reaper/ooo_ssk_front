import { type ReactNode } from "react";

import { classNames } from "@shared/libs/classNames/classNames";
import cls from "./styles.module.scss";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}
export const Container = ({ children, className }: ContainerProps) => (
  <div className={classNames(cls.container, {}, [className])}>
    {children}
  </div>
);

export const Substrate = ({ children, className }: ContainerProps) => (
  <div className={classNames(cls.substrate, {}, [className])}>
    {children}
  </div>
);
