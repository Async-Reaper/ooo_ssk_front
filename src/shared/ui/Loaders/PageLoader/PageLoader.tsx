import { classNames } from "../../../../shared/libs/classNames/classNames";

import cls from "./styles.module.scss";

import { Loader } from "../Loader/Loader";

interface PageLoaderProps {
  className?: string;
}

const Component = ({ className }: PageLoaderProps) => (
  <div className={classNames(cls.page__loader, {}, [className])}>
    <Loader />
  </div>
);

export const PageLoader = Component;
