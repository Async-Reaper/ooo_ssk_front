import { type ReactNode } from "react";

import { classNames } from "@shared/libs/classNames/classNames";
import cls from "./styles.module.scss";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}
export const Container = ({ children, className }: ContainerProps) => (
  <section className={classNames(cls.container, {}, [className])}>
    {children}
  </section>
);

export const Substrate = ({ children, className }: ContainerProps) => (
  <section className={classNames(cls.substrate, {}, [className])}>
    {children}
  </section>
);
