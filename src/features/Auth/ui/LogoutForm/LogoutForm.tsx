import React, { useCallback } from "react";
import { useAppDispatch } from "@shared/hooks";
import { Button, Typography } from "@shared/ui";
import { Modal } from "@shared/ui/Modal/Modal";
import { logoutUser } from "../../model/services/logoutUser";
import cls from "./LogoutForm.module.scss";

interface LogoutFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const Component = ({ isOpen, onClose }: LogoutFormProps) => {
  const dispatch = useAppDispatch();

  const onLogoutUser = useCallback(async () => {
    const response = await dispatch(logoutUser());
    if (response.meta.requestStatus === "fulfilled") {
      onClose();
    }
    window.location.reload();
  }, [dispatch, onClose]);
   
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={cls.logout__form__wrapper}>
        <Typography align="center" variant="h3">
          Вы действительно хотите выйти?
        </Typography>
        <div className={cls.logout__form__buttons}>
          <Button onClick={onLogoutUser} fullWidth>
            <Typography variant="h4">
              Выйти
            </Typography>
          </Button>
          <Button onClick={onClose} fullWidth background="tiffany-blue">
            <Typography variant="h4">
              Остаться
            </Typography>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export const LogoutForm = React.memo(Component);
