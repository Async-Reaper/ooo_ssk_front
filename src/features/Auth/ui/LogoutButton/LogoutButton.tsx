import React from "react";
import { Button, Typography } from "@shared/ui";
import { useModal } from "@shared/hooks";
import { LogoutForm } from "../LogoutForm/LogoutForm";

interface LogoutButtonProps {
  variant?: "text" | "contained";
}

const Component = ({ variant = "text" }: LogoutButtonProps) => {
  const { isOpen, open, close } = useModal();
  
  return (
    <>
      <Button variant={variant} onClick={open}>
        <Typography variant="h4">
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
