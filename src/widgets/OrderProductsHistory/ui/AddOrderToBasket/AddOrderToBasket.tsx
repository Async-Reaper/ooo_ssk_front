import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../shared/hooks";
import { getCurrentTradePoint } from "../../../../entities/TradePoint";
import { getUserAuthData } from "../../../../entities/user";
import { Button, Typography } from "../../../../shared/ui";
import { fetchAddToBasket } from "../../../../features/AddToBasket";
import {
  getOrdersHistoryProductsData,
} from "../../model/selectors/orderProductsHistoryListSelectors";
import { getNomenclatureByIdList } from "../../../../widgets/Nomenclature";
import { useAlertsInfo } from "../../../../widgets/Nomenclature/model/libs/hooks/useAlertsInfo";

const Component = () => {
  const dispatch = useAppDispatch();
  const alertInfo = useAlertsInfo();

  const currentTradePoint = useSelector(getCurrentTradePoint);
  const user = useSelector(getUserAuthData);
  const orderHistoryListData = useSelector(getOrdersHistoryProductsData);

  const nomenclatureList = useSelector(getNomenclatureByIdList);

  const onAddOrderToBasket = useCallback(() => {
    // eslint-disable-next-line array-callback-return
    orderHistoryListData?.map((order) => {
      const thisProduct = nomenclatureList?.find((product) => product.guid === order.product_guid);

      if (thisProduct) {
        const remains = thisProduct?.additional_information?.remains;
        if (remains > 0) {  
          dispatch(fetchAddToBasket({
            product_guid: order.product_guid,
            count: order.count,
            contract_guid: currentTradePoint!.guid,
            user_guid: user!.userGUID,
          }));     
        } else {
          alertInfo.onOpenAlert({
            id: 1,
            title: "Не удалось добавить в корзину.",
            text: `Товар "${thisProduct?.short_name}" закончился`,
            type: "error",
          });
        }
      }
    });
  }, [dispatch, orderHistoryListData, user, currentTradePoint]);

  return (
    <Button onClick={onAddOrderToBasket}>
      <Typography variant="h3">
        Добавить заказ в корзину
      </Typography>
    </Button>
  );
};

export const AddOrderToBasket = React.memo(Component);
