import React, { type ReactNode } from "react";

import cls from "./styles.module.scss";

interface Props {
  children?: ReactNode;
}
const Component = ({ children }: Props) => (
  <div className={cls.body}>{children}</div>
);

export const ModalBody = React.memo(Component);
