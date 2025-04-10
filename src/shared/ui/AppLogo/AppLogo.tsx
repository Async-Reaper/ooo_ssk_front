import React from "react";

import { AppImage } from "@shared/ui";
import cls from "./styles.module.scss";

const Component = () => (
  <div className={cls.logo}>
    <AppImage src="/common/logo.svg" />
  </div>
);

export const AppLogo = React.memo(Component);
