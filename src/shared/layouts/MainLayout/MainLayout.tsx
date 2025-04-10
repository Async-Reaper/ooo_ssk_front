import { memo, type ReactElement } from "react";

import { classNames } from "../../../shared/libs/classNames/classNames";
import { useIsShowElems } from "../../../shared/hooks";
import cls from "./MainLayout.module.scss";
import { AppImage } from "../../ui";

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

      {location.pathname !== "/login"
         && (
           <div className={cls.decoractions}> 

             <AppImage className={cls.lwave} src="/common/left_wave.svg" />

             <AppImage className={cls.rwave} src="/common/right_wave.svg" /> 

             <AppImage className={cls.mwave} src="/common/mobile_wave.svg" /> 

           </div>
         )}
    </div>
         
  );
});
