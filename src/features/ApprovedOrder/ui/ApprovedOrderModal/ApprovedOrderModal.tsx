import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "../../../../shared/ui";
import { Modal } from "../../../../shared/ui/Modal/Modal";
import { getApprovedOrderMessage } from "../../model/selectors/approvedOrderSelectors";
import cls from "./ApprovedOrderModal.module.scss";

interface ApprovedOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Component = ({ isOpen, onClose }: ApprovedOrderModalProps) => {
  const message = useSelector(getApprovedOrderMessage);
   
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={cls.approved_modal}>
        <Typography align="center" variant="h4">
          {message}
        </Typography>
      </div>
    </Modal>
  );
};

export const ApprovedOrderModal = React.memo(Component);
