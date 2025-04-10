import { memo } from "react";

import { classNames } from "@shared/libs/classNames/classNames";
import cls from "./Skeleton.module.scss";

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
  const {
    className, height, width, border, 
  } = props;

  return (
    <div
      className={classNames(cls.Skeleton, {}, [className])}
      style={{ width, height, borderRadius: border }}
    />
  );
});
