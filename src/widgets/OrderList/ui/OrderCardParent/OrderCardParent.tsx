import React, { useState } from "react";
import { IDocumentInfo } from "../../model/types/orderList";
import cls from "./OrderCardParent.module.scss";
import { OrderCardChild } from "../OrderCardChild/OrderCardChild";
import { VStack } from "../../../../shared/ui";
import { classNames } from "../../../../shared/libs/classNames/classNames";

interface orderCardParentProps {
  buyer?: string;
  tradePoint?: string;
  amount?: number;
  countDocuments?: number;
  approvedDocuments?: number;
  contractGUID?: string;
  documents?: IDocumentInfo[],
}

const Component = ({
  buyer,
  tradePoint,
  amount,
  countDocuments,
  approvedDocuments,
  documents,
  contractGUID,
} : orderCardParentProps) => {
  const [showChild, setShowChild] = useState(false);

  return (
    <>
      <div className={cls.ordercard__wrapper} onClick={() => setShowChild(!showChild)}>

        <div className={classNames(cls.buyer_wrap, {}, [cls.ordercard__info])}>
          { buyer! }
        </div>

        <div className={classNames(cls.trade_wrap, {}, [cls.ordercard__info])}>
          { tradePoint! }
        </div>

        <div className={classNames(cls.sum_wrap, {}, [cls.ordercard__info])}>
          { amount!.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }
          {" "}
          ₽
        </div>
            
        <div className={classNames(cls.approved_wrap, {}, [cls.ordercard__info])}>
          { approvedDocuments! }
          / 
          { countDocuments! }
        </div>

      </div>
         
      {showChild
         && (
           <VStack className={cls.ordercard__child__wrapper} gap="16">
             { documents!.map((document) => (
               <OrderCardChild 
                 key={document.documentGUID}
                 number={document.number}
                 documentGUID={document.documentGUID}
                 date={document.date}
                 dateshipment={document.dateShipment}
                 amount={document.amount}
                 approved={document.approved}
                 isNew={document.is_new}
                 contractGUID={contractGUID}
               /> 
             ))}
           </VStack>
         )}
    </>
  );
}; 

export const OrderCardParent = React.memo(Component);
