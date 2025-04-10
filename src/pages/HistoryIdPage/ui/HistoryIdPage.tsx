import { Container, HStack, VStack } from "@shared/ui";
import { OrderProductsHistoryList, AddOrderToBasket } from "@widgets/OrderProductsHistory";
import { ButtonBack } from "../../../widgets/ButtanBack/ui/ButtonBack";
import { Substrate } from "../../../shared/ui/Primitives/Container/Container";

const HistoryIdPage = () => (
  <Container>
    <VStack gap="16" align="center" max>
      <HStack gap="16" justify="center" max>
        <ButtonBack />
        <AddOrderToBasket />
      </HStack>
      <Substrate>
        <OrderProductsHistoryList />
      </Substrate>
    </VStack>
  </Container>
);

export default HistoryIdPage;
