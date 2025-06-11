import { type ReactNode } from "react";

import { classNames, Mods } from "@shared/libs/classNames/classNames";
import { useViewModal } from "@shared/ui/Modal/useView";
import cls from "./styles.module.scss";

import { Portal } from "../Primitives/Portal/Portal";

import { ModalBody } from "./ModalBody/ModalBody";
import { ModalHeading } from "./ModalHeading/ModalHeading";

type ModalTheme = "light";
export interface ModalProps {
  className?: string;
  children?: ReactNode;
  color?: ModalTheme;
  isOpen?: boolean;
  onClose?: () => void;
  size?: DesignSystemUiSize;
  lazy?: boolean;
}

export const Modal = (props: ModalProps) => {
  const {
    className,
    children,
    color = "light",
    isOpen,
    onClose,
    lazy,
    size = "xs",
  } = props;

  const {
    isClosing, isMounted, closeHandler, onContentClick, 
  } = useViewModal(
    isOpen,
    onClose,
  );

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  const classes = [cls[`size--${size}`], cls[`color--${color}`]];

  return (
    <Portal>
      <div
        className={classNames(cls.Modal, mods, [
          className,
          "app_modal",
        ])}
      >
        <div className={cls.overlay} onClick={closeHandler}>
          <div
            className={classNames(cls.content, {}, classes)}
            onClick={onContentClick}
          >
            <ModalHeading onClose={closeHandler} />
            <ModalBody>{children}</ModalBody>
          </div>
        </div>
      </div>
    </Portal>
  );
};
