import { useSelector } from "react-redux";
import { UserRoles, getUserRole } from "../../../entities/user";
import { Container, Typography } from "../../../shared/ui";
import { NomenclaturesList, NomenclaturesListForSeller } from "../../../widgets/Nomenclature";
import cls from "./MainPage.module.scss";
import { getCurrentTradePoint } from "../../../entities/TradePoint/model/selectors/tradePointSelectors";
import { Substrate } from "../../../shared/ui/Primitives/Container/Container";

const MainPage = () => {
  const userRole = useSelector(getUserRole);
  const currentTradePoint = useSelector(getCurrentTradePoint);

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
  return (
    <Container>
      { userRole === UserRoles.BUYER 
        ? renderBuyer 
        : renderSeller}
    </Container>
  );
};

export default MainPage;
