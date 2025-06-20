import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Typography } from "@shared/ui";
import { useAppDispatch, useModal } from "@shared/hooks";
import { DynamicModuleLoader, ReducersList } from "@shared/libs/component";
import { fetchGetSellerData } from "@features/GetSellerData/model/services/fetchGetSellerData";
import { IGetSellerData } from "@features/GetSellerData/model/types/getSellerData";
import { fetchDeleteFromSellerData } from "@features/DeleteFromSellerData/model/services/fetchDeleteFromSellerData";
import { getUserAuthData, initUserAuthData } from "@entities/user";
import { sellerDataActions } from "@entities/SellerOrders";
import { Conditions } from "@shared/libs/conditions/conditions";
import { selectSumBasketActions } from "@widgets/SumBasket/model/slice/stateBasketSlice";
import { useAlertsInfo } from "@widgets/Nomenclature/model/libs/hooks/useAlertsInfo";
import { approvedOrderReducer } from "../../model/slice/approvedOrderSlice";
import { ApprovedOrderModal } from "../ApprovedOrderModal/ApprovedOrderModal";
import { fetchApprovedOrder } from "../../model/services/fetchApprovedOrder";
import { IApprovedOrder } from "../../model/types/approvedOrder";
import { getApprovedOrderIsLoading } from "../../model/selectors/approvedOrderSelectors";

interface ApprovedOrderButtonProps {
  dataApprovedOrder: IApprovedOrder
  isApproved?: boolean
}

const reducers: ReducersList = {
  approvedOrderForm: approvedOrderReducer,
};

const Component = ({ dataApprovedOrder, isApproved }: ApprovedOrderButtonProps) => {
  const dispatch = useAppDispatch();
  const { isOpen, open, close } = useModal();
  const navigate = useNavigate();
  const [paramsQuery] = useSearchParams();
  const params = useParams<{id: string}>();
  const alertBox = useAlertsInfo();
  const approvedOrderIsLoading = useSelector(getApprovedOrderIsLoading);
  const user = useSelector(getUserAuthData);
  const documentGUID = paramsQuery.get("documentGUID") || params.id!;

  const onHandleCreateOrder = useCallback(async () => {
    const paramRequest = {
      document_guid: documentGUID,
      user_guid: user?.userGUID!,
    };
      
    if (dataApprovedOrder?.products.length === 0) {
      const response = await dispatch(fetchGetSellerData(paramRequest));
      if (response.meta.requestStatus === "fulfilled") {
        const sellerData : IGetSellerData = response.payload;
        dataApprovedOrder.products = sellerData?.document_data?.products || [];
      }
    }

    const response = await dispatch(fetchApprovedOrder(dataApprovedOrder));  
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(fetchDeleteFromSellerData(paramRequest));
      const httpQuery = new URLSearchParams(location.search);
      dispatch(sellerDataActions.changeSellerData(undefined));
      httpQuery.delete("documentGUID");
      httpQuery.delete("contractGUID");
      navigate({
        pathname: "/orders",
        search: `${httpQuery}`,
      });
      // setApprovedDoc(true);
      dispatch(selectSumBasketActions.setSumBasket(0));
      alertBox.onOpenAlert({
        id: 1,
        type: "success",
        title: "Успешно",
        text: "Заказ утвержден",
      });
    } else {
      open();
    }
    dispatch(initUserAuthData());
  }, [dispatch, dataApprovedOrder, open]);

  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={reducers}
    >
      <>
        <Button
          onClick={onHandleCreateOrder}
          disabled={isApproved || approvedOrderIsLoading}
        >
          <Typography variant="h4">
            Подтвердить
          </Typography>
        </Button>
        <Conditions condition={isOpen}>
          <ApprovedOrderModal isOpen={isOpen} onClose={close} />
        </Conditions>
      </>
    </DynamicModuleLoader>
  );
};

export const ApprovedOrderButton = React.memo(Component);
