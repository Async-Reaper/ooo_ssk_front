import { memo, type ReactElement } from "react";

import { useIsShowElems } from "@shared/hooks";
import { classNames } from "@shared/libs/classNames/classNames";
import cls from "./MainLayout.module.scss";

interface MainLayoutProps {
  className?: string;
  header: ReactElement;
  content: ReactElement;
  sidebar: ReactElement;
  footer: ReactElement;
}

export const MainLayout = memo((props: MainLayoutProps) => {
  const {
    className, content, sidebar, header, footer, 
  } = props;   

  const { isShowHeader, isShowFooter } = useIsShowElems();
   
  return (
    <div className={classNames(cls.mainLayout, {}, [className])}>
      <div className={cls.sidebar}>{sidebar}</div>
      {isShowHeader && <div className={cls.header}>{header}</div>}
      <div className={cls.content}>{content}</div>
      {isShowFooter && <div className={cls.footer}>{footer}</div>}
    </div>
         
  );
});
