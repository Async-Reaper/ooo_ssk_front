import React, { type Dispatch, type FC, type SetStateAction } from "react";
import { classNames } from "@shared/libs/classNames/classNames";

import cls from "./styles.module.scss";

interface Props {
  variant?: DesignSystemUiSize;
  isActive: boolean;
  handler: Dispatch<SetStateAction<boolean>>,
  color?: DesignSystemColors,
  background?: DesignSystemColors,
}

const Component: FC<Props> = (props) => {
  const {
    variant = "l",
    isActive = false,
    handler,
    color = "primary",
    background = "primary",
  } = props;

  const changeToggle = () => { handler((prevState) => !prevState); };

  const addToggle = [
    cls[`variant--${variant}`],
    cls[`background--${background}`],
  ];
  const modsToggle = {
    [cls.active]: isActive,
  };

  const addToggleSlider = [
    cls[`variant--${variant}`],
    cls[`color--${color}`],
  ];

  return (
    <div
      onClick={changeToggle}
      className={classNames(cls.toggle, modsToggle, addToggle)}
    >
      <div className={classNames(
        cls.toggleSlider,
        {},
        addToggleSlider,
      )}
      />
    </div>
  );
};

export const Toggle = React.memo(Component);
