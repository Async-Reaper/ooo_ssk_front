import React from "react";
import { VStack } from "@shared/ui";
import { Conditions } from "@shared/libs/conditions/conditions";
import { Product } from "@features/GetSellerData";
import { NomenclatureCardForSeller } from "@widgets/Nomenclature";
import { BasketEmpty } from "../BasketEmpty/BasketEmpty";

interface BasketProductsListProps {
  basketProductsList?: Product[],
  userGUID?: string,
  documentGUID?: string,
}

const Component = ({
  basketProductsList, userGUID, documentGUID,
}: BasketProductsListProps) => (
  <>
    <Conditions condition={!basketProductsList?.length}>
      <BasketEmpty />
    </Conditions>
    <Conditions condition={basketProductsList?.length}>
      <VStack gap="8">
        {basketProductsList?.map((basketProduct) => (
          <NomenclatureCardForSeller
            key={basketProduct.product_guid}
            guid={basketProduct.product_guid!}
            count={basketProduct?.count}
            userGUID={userGUID}
            documentGUID={documentGUID}
            isWithGuid
            price={basketProduct.price}
            isBasket
          />
        ))}
      </VStack>
    </Conditions>
  </>
);

export const BasketProductsListFromSeller = React.memo(Component);
