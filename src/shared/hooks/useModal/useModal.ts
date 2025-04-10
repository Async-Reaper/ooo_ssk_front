import React from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const open = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return {
    isOpen,
    open,
    close,
  };
};
