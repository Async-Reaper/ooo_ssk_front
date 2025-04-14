import React, { ReactNode } from "react";
import { classNames } from "@shared/libs/classNames/classNames";
import styles from "./Button.module.scss";

type ButtonSize = "xs" | "s" | "l" | "xl" | "xxl" | "login" | "logout"
type ButtonBC = "gray-primary" | "gray-secondary" | "gray-light" | "violet-primary" | 
"violet-secondary" | "white-bg" | "black" | "red-primary" | 
"red-secondary" | "tiffany-blue" | "beet-pink" | "beige" | 
"brown" | "green" | "red"

interface ButtonProps {
  variant?: "text" | "contained" | "outlined" | "login_special"| "round_logout" | "comparate_button" | "transpar";
  fullWidth?: boolean;
  className?: string;
  maxWidth?: boolean;
  color?: DesignSystemColors;
  background?: ButtonBC;
  children: ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  size?: ButtonSize
}

const Component = (props: ButtonProps) => {
  const {
    variant = "contained",
    className,
    fullWidth = false,
    color,
    children, 
    onClick,
    isLoading = false,
    disabled = false,
    size = "l",
    maxWidth,
    background,
  } = props;

  const mods = {
    [styles.isLoading]: isLoading,
    [styles.full_width]: fullWidth,
    [styles.max__width]: maxWidth,
  };

  const classes = [
    styles[`variant--${variant}`],
    styles[`color--${color}`],
    styles[`size--${size}`],
    styles[`background--${background}`],
  ];

  if (className) classes.push(className);

  return (
    <button
      disabled={disabled}   
      className={classNames(styles.button, mods, classes)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const Button = React.memo(Component);
