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

  const add = [
    styles[`variant--${variant}`],
    styles[`color--${color}`],
    styles[`size--${size}`],
    styles[`background--${background}`],
  ];

  return (
    <button
      disabled={disabled}   
      className={classNames(styles.button, mods, add)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const Button = React.memo(Component);
