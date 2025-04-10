// import React, { useCallback } from "react";
// import { useSelector } from "react-redux";
// import { useAppDispatch } from "../../../../shared/hooks";
// import { getCurrentTradePoint } from "../../../../entities/TradePoint";
// import { getUserAuthData } from "../../../../entities/user";
// import { Button, Typography } from "../../../../shared/ui";
// import { fetchAddToBasket } from "../../../../features/AddToBasket";
// import {
//    getOrdersHistoryProductsData,
// } from "../../model/selectors/orderProductsListSelectors";

// const Component = () => {
//    const dispatch = useAppDispatch();
//    const currentTradePoint = useSelector(getCurrentTradePoint);
//    const user = useSelector(getUserAuthData);
//    const orderHistoryListData = useSelector(getOrdersHistoryProductsData);

//    const onAddOrderToBasket = useCallback(() => {
//       // eslint-disable-next-line array-callback-return
//       orderHistoryListData?.map((order) => {
//          dispatch(fetchAddToBasket({
//             product_guid: order.product_guid,
//             count: order.count,
//             contract_guid: currentTradePoint!.guid,
//             user_guid: user!.userGUID,
//          }));
//       });
//    }, [dispatch, orderHistoryListData, user, currentTradePoint]);

//    return (
//       <Button onClick={onAddOrderToBasket}>
//          <Typography variant="h4">
//             Добавить заказ в корзину
//          </Typography>
//       </Button>
//    );
// };

// export const AddOrderToBasket = React.memo(Component);
