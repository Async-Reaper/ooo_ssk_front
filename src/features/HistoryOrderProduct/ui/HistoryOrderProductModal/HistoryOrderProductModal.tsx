import React from "react";
import { Modal } from "../../../../shared/ui/Modal/Modal";
import { HistoryOrderProductList } from "../HistoryOrderProductList/HistoryOrderProductList";

interface HistoryOrderProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
}

const Component = ({ isOpen, onClose, productId }: HistoryOrderProductModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    size="s"
  >
    <HistoryOrderProductList productId={productId} />
  </Modal>
);

export const HistoryOrderProductModal = React.memo(Component);
