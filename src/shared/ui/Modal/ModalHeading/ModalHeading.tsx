import React, { type ReactNode } from "react";

import cls from "./styles.module.scss";

interface Props {
  children?: ReactNode;
  onClose: () => void;
}
const Component = ({ children, onClose }: Props) => (
  <div className={cls.heading}>
    <div className={cls.modalClose} onClick={onClose} />
    {children}
  </div>
);

export const ModalHeading = React.memo(Component);
