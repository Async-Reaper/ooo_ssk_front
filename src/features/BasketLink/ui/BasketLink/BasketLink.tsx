import React from "react";
import { HStack } from "@shared/ui";
import { BasketButton } from "../BasketButton/BasketButton";

const Component = () => (
  <HStack align="center" justify="center">
    <BasketButton />
  </HStack>
);

export const BasketLink = React.memo(Component);
