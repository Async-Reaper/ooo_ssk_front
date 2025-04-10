import React from "react";
import { useSelector } from "react-redux";
import { Modal } from "@shared/ui/Modal/Modal";
import { Typography } from "@shared/ui";
import { getCreateOrderMessage } from "../../model/selectors/createOrderSelectors";

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Component = ({ isOpen, onClose }: CreateOrderModalProps) => {
  const message = useSelector(getCreateOrderMessage);
   
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <Typography align="center" variant="h4">
        {message}
      </Typography>
    </Modal>
  );
};

export const CreateOrderModal = React.memo(Component);
