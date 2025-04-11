import React from "react";
import { Button, Typography } from "@shared/ui";
import { useModal } from "@shared/hooks";
import { LogoutForm } from "../LogoutForm/LogoutForm";

const Component = () => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <Button variant="text" onClick={open}>
        <Typography variant="h3">
          Выйти
        </Typography>
      </Button>
      {
        isOpen && <LogoutForm isOpen onClose={close} />
      }
    </>
  );
};

export const LogoutButton = React.memo(Component);
