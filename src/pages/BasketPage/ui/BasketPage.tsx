import { useSelector } from "react-redux";
import { Container } from "../../../shared/ui";
import { UserRoles, getUserAuthData } from "../../../entities/user";
import { BasketFromSeller, Basket } from "../../../widgets/Basket";

const BasketPage = () => {
  const user = useSelector(getUserAuthData);
  return (
    <Container>
      {user?.role === UserRoles.BUYER 
        ? <Basket /> 
        : <BasketFromSeller />}
    </Container>
  ); 
};

export default BasketPage;
