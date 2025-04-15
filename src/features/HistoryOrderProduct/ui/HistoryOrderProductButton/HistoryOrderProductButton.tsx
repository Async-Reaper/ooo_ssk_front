import React from "react";
import { useModal } from "@shared/hooks";
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
      <HistoryOrderProductModal isOpen={isOpen} onClose={close} productId={productId}/>
      <div className={cls.history_object} onClick={open}>
        <Typography>
          история
        </Typography>
      </div>
    </>
  );
};

export const HistoryOrderProductButton = React.memo(Component);
