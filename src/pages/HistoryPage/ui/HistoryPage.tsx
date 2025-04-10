import { Container, VStack } from "../../../shared/ui";
import { SelectDate, HistoryOrdersList } from "../../../features/HistoryOrders";

const HistoryPage = () => (
  <Container>
    <VStack gap="16" align="center">
      <SelectDate />
      <HistoryOrdersList />
    </VStack>
  </Container>
);

export default HistoryPage;
