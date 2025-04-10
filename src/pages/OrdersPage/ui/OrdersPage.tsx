import { Container, VStack } from "../../../shared/ui";
import { OrdersList } from "../../../widgets/OrderList/ui/OrdersList/OrdersList";
import { Substrate } from "../../../shared/ui/Primitives/Container/Container";

const OrdersPage = () => (
  <Container>
    <VStack gap="32" align="center">
      <Substrate>
        <OrdersList />
      </Substrate>
    </VStack>
  </Container>
);

export default OrdersPage;
