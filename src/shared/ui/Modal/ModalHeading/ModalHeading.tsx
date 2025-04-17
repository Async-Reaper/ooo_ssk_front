import React, { type ReactNode } from "react";

import { Icon } from "@shared/libs/icons";
import { AppImage } from "@shared/ui";
import cls from "./styles.module.scss";

interface Props {
  children?: ReactNode;
  onClose: () => void;
}
const Component = ({ children, onClose }: Props) => (
  <div className={cls.heading}>
    <div className={cls.logo__wrapper}>
      <AppImage src="/common/logo.png" className={cls.logo} />
    </div>
    <div className={cls.modalClose} onClick={onClose}>
      <Icon name="close" size={40} color="red" />
    </div>
    {children}
  </div>
);

export const ModalHeading = React.memo(Component);
