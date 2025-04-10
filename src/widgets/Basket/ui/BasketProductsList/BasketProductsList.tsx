import React from "react";
import { IBasket } from "../../../../entities/BasketEntitie";
import { IFavorite } from "../../../../entities/FavoriteProducts";
import { NomenclatureCard } from "../../../Nomenclature";
import { VStack } from "../../../../shared/ui";
import { Conditions } from "../../../../shared/libs/conditions/conditions";
import { BasketEmpty } from "../BasketEmpty/BasketEmpty";

interface BasketProductsListProps {
  basketProductsList: IBasket[]
  favoriteProductsList: IFavorite[];
}

const Component = ({ basketProductsList, favoriteProductsList }: BasketProductsListProps) => (
  <>
    <Conditions condition={!basketProductsList?.length}>
      <BasketEmpty />
    </Conditions>
    <Conditions condition={basketProductsList?.length}>
      <VStack gap="16" max align="center" justify="center">
        {basketProductsList?.map((basketProduct) => (
          <NomenclatureCard
            key={basketProduct.product_guid}
            nomenclature={basketProduct.other_data}
            basketList={basketProductsList}
            favoriteList={favoriteProductsList}
            isBasket
          />
        ))}
      </VStack>
    </Conditions>
  </>
);

export const BasketProductsList = React.memo(Component);
