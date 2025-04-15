import React from "react";
import { LogoutButton } from "@features/Auth";
import { Typography } from "@shared/ui";
import { Conditions } from "@shared/libs/conditions/conditions";
import { useSelector } from "react-redux";
import { getCurrentTradePoint } from "@entities/TradePoint";
import { getUserRole, UserRoles } from "@entities/user";
import cls from "./Footer.module.scss";

const Component = () => {
  const currentTradePoint = useSelector(getCurrentTradePoint);
  const currentRole = useSelector(getUserRole);
  
  return (
    <>
      <div className={cls.logout__wrapper}>
        <LogoutButton />
      </div>
      <div className={cls.description}>
        <Typography variant="h5">
          Разработка сайта &quot;Агит-Плюс&ldquo;
        </Typography>
      </div>
      {(currentRole === UserRoles.SELLER)
       && (
         <Conditions condition={currentTradePoint?.representative_name?.length}>
           <div className={cls.footer}>
             <Typography className={cls.text} variant="h4" color="white-bg">
               Контакты торгового представителя
               {" "}
             </Typography>
             <Typography className={cls.text} variant="h4" color="white-bg">
               {currentTradePoint?.representative_name.length
                 ? (`${currentTradePoint?.representative_name} ${currentTradePoint?.representative_phone}`)
                 : ("Не указано")}
             </Typography>
           </div>
         </Conditions>
       )}
    </>
  );
};

export const Footer = React.memo(Component);
