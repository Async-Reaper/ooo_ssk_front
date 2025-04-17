import React from "react";
import {
  AppLink, Container, Typography, VStack, 
} from "@shared/ui";
import { SelectDate, HistoryOrdersList } from "@features/HistoryOrders";
import { getRouteMain } from "@shared/const/router";
import cls from "./HistoryPage.module.scss";

const HistoryPage = () => (
  <VStack gap="16">
    <div className={cls.link__products__wrapper}>
      <AppLink to={getRouteMain()} variant="secondary">
        <Typography variant="h4">
          Выбор товаров
        </Typography>
      </AppLink>
    </div>
    <Container>
      <VStack gap="16" className={cls.history__content} max>
        <SelectDate/>
        <HistoryOrdersList/>
      </VStack>
    </Container>
  </VStack>
);

export default HistoryPage;
