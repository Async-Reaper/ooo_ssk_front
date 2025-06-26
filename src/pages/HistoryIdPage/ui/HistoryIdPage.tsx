import { Container, HStack, VStack } from "@shared/ui";
import { Substrate } from "@shared/ui/Primitives/Container/Container";
import { ButtonBack } from "@widgets/ButtonBack/ui/ButtonBack";
import { AddOrderToBasket, OrderProductsHistoryList } from "@widgets/OrderProductsHistory";

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
