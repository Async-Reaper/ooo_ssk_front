import { UserRoles, getUserAuthData } from "@entities/user";
import { Container } from "@shared/ui";
import { Basket, BasketFromSeller } from "@widgets/Basket";
import { useSelector } from "react-redux";

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
