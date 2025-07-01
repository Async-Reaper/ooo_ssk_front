import { getUserRole, UserRoles } from "@entities/user";
import { SocialModal } from "@features/SocialModal";
import { useModal } from "@shared/hooks";
import { Container } from "@shared/ui";
import { Substrate } from "@shared/ui/Primitives/Container/Container";
import { NomenclaturesList, NomenclaturesListForSeller } from "@widgets/Nomenclature";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import cls from "./MainPage.module.scss";

const MainPage = () => {
  const userRole = useSelector(getUserRole);
  const { isOpen, open, close } = useModal();

  const renderBuyer = (
    <div className={cls.main_page}>
      <Substrate>
        <NomenclaturesList />
      </Substrate>
    </div>
  );

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
