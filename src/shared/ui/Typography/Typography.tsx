import React from "react";

import { classNames, Mods } from "@shared/libs/classNames/classNames";
import cls from "./styles.module.scss";

export type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type Align = "center" | "right" | "left";

type Font = "secondary" | "inherit";

const mapTag = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
};

interface TypographyProps {
  color?: DesignSystemTextColors;
  children?: React.ReactNode;
  bold?: boolean;
  className?: string;
  variant?: Variant;
  inline?: boolean;
  noWrap?: boolean;
  align?: Align;
  font?: Font;
  uppercase?: boolean;
}

const Component = (props: TypographyProps) => {
  const {
    className,
    variant = "h5",
    color = "inherit",
    children,
    noWrap = false,
    inline = false,
    align = "left",
    font = "inherit",
    uppercase = false,
    bold = false,
    ...otherProps
  } = props;

  const ComponentUi = mapTag[variant];

  const mods: Mods = {
    [cls.uppercase]: uppercase,
    [cls.noWrap]: noWrap,
    [cls.inline]: inline,
    [cls.bold]: bold,
  };

  const classes = [
    cls[`font--${font}`],
    cls[`variant--${variant}`],
    cls[`color--${color}`],
    cls[`align--${align}`],
  ];

  if (className) classes.push(className);

  return (
  // @ts-expect-error
    <ComponentUi
      className={classNames(cls.text, mods, classes)}
      {...otherProps}
    >
      {children}
    </ComponentUi>
  );
};

export const Typography = React.memo(Component);
