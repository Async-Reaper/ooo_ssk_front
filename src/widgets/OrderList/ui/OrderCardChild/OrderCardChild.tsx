import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import cls from "./OrderCardChild.module.scss";
import { ApprovedOrderButton } from "../../../../features/ApprovedOrder";
import { getUserAuthData } from "../../../../entities/user";
import { HStack, Typography } from "../../../../shared/ui";
import { ColoredIcon } from "../../../../shared/libs/icons";
import { classNames } from "../../../../shared/libs/classNames/classNames";

interface orderCardChildProps {
  number?: string;
  documentGUID?: string;
  contractGUID?: string;
  date?: string;
  dateshipment?: string;
  amount?: number;
  approved?: boolean;
  isNew?: boolean;
}

const Component = ({
  number,
  documentGUID,
  date,
  dateshipment,
  amount,
  approved,
  isNew,
  contractGUID,
} : orderCardChildProps) => {
  const navigate = useNavigate();

  const user = useSelector(getUserAuthData);
  const dataApprovedOrder: any = useMemo(() => ({
    header: {
      userGUID: user?.userGUID,
      documentGUID: documentGUID!,
      dateShipment: "",
      comment: "",
    },
    products: [],
  }), [user]);

  const onHandleOpenOrder = () => {
    navigate({
      pathname: `/orders/${documentGUID}`,
      search: `?documentGUID=${documentGUID}&contractGUID=${contractGUID}`,
    });
  };
  return (
    <div className={cls.document_wrapper}>
      <HStack gap="16" justify="between" className={cls.allcard_wrap}>
        <div
          className={cls.cardchild__wrapper}
          onClick={onHandleOpenOrder}
        >
          <div className={classNames(cls.doc_wrap, {}, [cls.cardchild__info])}>
            Документ № 
            { number! }
            { " " }
            от: 
            { " " }
            { date! }

            <br />

            Отгрузка: 
            { " " }
            { dateshipment!
              ? dateshipment
              : "Не указано"}
          </div>

          <div className={cls.cardchild__info}>
            Сумма:
            { " " }
            { amount! }

          </div>

          <div className={cls.approve_info}>
            {approved
                  && <ColoredIcon name="checkbox" size={40} />}
          </div>

          {isNew 
               && (
                 <div className={cls.new}>
                   <Typography variant="h5" bold>
                     Новое
                   </Typography>
                 </div>
               )}

        </div>          
        <>
          <ApprovedOrderButton dataApprovedOrder={dataApprovedOrder} isApproved={approved!} />
        </>
      </HStack>
    </div>
  );
};

export const OrderCardChild = React.memo(Component);
