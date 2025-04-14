import { useSelector } from "react-redux";
import { getUserRole, UserRoles } from "@entities/user";
import { Container, Typography } from "@shared/ui";
import { NomenclaturesList, NomenclaturesListForSeller } from "@widgets/Nomenclature";
import { getCurrentTradePoint } from "@entities/TradePoint";
import { Substrate } from "@shared/ui/Primitives/Container/Container";
import React, { useEffect } from "react";
import { SocialModal } from "@features/SocialModal";
import { useModal } from "@shared/hooks";
import cls from "./MainPage.module.scss";

const MainPage = () => {
  const userRole = useSelector(getUserRole);
  const currentTradePoint = useSelector(getCurrentTradePoint);
  const { isOpen, open, close } = useModal();

  const renderBuyer = (
    <div className={cls.main_page}>
      <Substrate>
        {currentTradePoint?.guid !== undefined && currentTradePoint?.guid.length > 0
          ? (<NomenclaturesList />)
          : (
            // <SelectTradePoint />
            <Typography variant="h3" bold align="center">
              Не выбран договор.
            </Typography>
          )}
      </Substrate>
    </div>
  );

  // const orderHeader = useSelector(getOrderHeaderData);
  const renderSeller = (
    <div className={cls.main_page}>
      <Substrate>
        <NomenclaturesListForSeller />
      </Substrate>
    </div>
  );

  useEffect(() => {
    if (!localStorage.getItem("isModalSocialView")) {
      open();
    }
  }, []);
  
  return (
    <Container>
      { userRole === UserRoles.BUYER 
        ? renderBuyer 
        : renderSeller} 
      <SocialModal
        isOpen={isOpen}
        onClose={close}
      />
    </Container>
  );
};

export default MainPage;
