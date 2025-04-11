import React from "react";
import { useModal } from "@shared/hooks";
import { Conditions } from "@shared/libs/conditions/conditions";
import { Typography } from "@shared/ui";
import { HistoryOrderProductModal } from "../HistoryOrderProductModal/HistoryOrderProductModal";
import cls from "./HistoryOrderProductButton.module.scss";

interface HistoryOrderProductButtonProps {
  productId: string;
}

const Component = ({ productId }: HistoryOrderProductButtonProps) => {
  const { isOpen, open, close } = useModal();
   
  return (
    <>
      <Conditions condition={isOpen}>
        <HistoryOrderProductModal isOpen={isOpen} onClose={close} productId={productId} />
      </Conditions>
      <div className={cls.history_object} onClick={open}>
        <Typography>
          История заказов
        </Typography>
      </div>
    </>
  );
};

export const HistoryOrderProductButton = React.memo(Component);
