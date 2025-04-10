import React from "react";
import { Button, Typography } from "../../../../shared/ui";
import { LogoutForm } from "../../../../features/Auth/ui/LogoutForm/LogoutForm";
import { useModal } from "../../../../shared/hooks";

const Component = () => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <Button variant="round_logout" size="logout" onClick={open}>
        <Typography>
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
