import React from "react";
import { useSelector } from "react-redux";
import { UserRoles, getUserRole } from "@entities/user";
import { Container, Typography } from "../../../shared/ui";
import cls from "./Footer.module.scss";
import { getCurrentTradePoint } from "../../../entities/TradePoint/model/selectors/tradePointSelectors";
import { Conditions } from "../../../shared/libs/conditions/conditions";

const Component = () => {
  const currentTradePoint = useSelector(getCurrentTradePoint);
  const currentRole = useSelector(getUserRole);
   
  return (
    <Container>
      { (currentRole === UserRoles.SELLER)
        ? (
          <div className={cls.footer}>
            <Typography className={cls.text} variant="h4" color="neutral-text">
              Пустое окно
            </Typography>
          </div>
        )
        : (
          <Conditions condition={currentTradePoint?.representative_name?.length}>
            <div className={cls.footer}>
              <Typography className={cls.text} variant="h3" color="neutral-text">
                Контакты торгового представителя 
                {" "}
              </Typography>
              <Typography className={cls.text} variant="h3" color="neutral-text">
                { currentTradePoint?.representative_name.length
                  ? (`${currentTradePoint?.representative_name} ${currentTradePoint?.representative_phone}`)
                  : ("Не указано")}
              </Typography>
            </div>
          </Conditions>
        )}
    </Container>
  );
};

export const Footer = React.memo(Component);
