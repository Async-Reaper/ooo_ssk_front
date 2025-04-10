import React from "react";
import { NomenclatureCardForSeller } from "../../../Nomenclature";
import { VStack } from "../../../../shared/ui";
import { Conditions } from "../../../../shared/libs/conditions/conditions";
import { BasketEmpty } from "../BasketEmpty/BasketEmpty";
import { Product } from "../../../../features/GetSellerData/model/types/getSellerData";

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
      {basketProductsList?.map((basketProduct) => (
        <VStack gap="8" key={basketProduct.product_guid}>
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
        </VStack>
      ))}
    </Conditions>
  </>
);

export const BasketProductsListFromSeller = React.memo(Component);
