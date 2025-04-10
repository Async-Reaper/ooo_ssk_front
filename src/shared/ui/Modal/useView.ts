import type React from "react";
import {
  type MutableRefObject, useCallback, useEffect, useRef, useState, 
} from "react";

import { type ModalProps } from "./Modal";

interface viewProps {
  isClosing: boolean;
  isMounted: boolean;
  closeHandler: () => void;
  onContentClick: (e: React.MouseEvent) => void;
}
const ANIMATION_DELAY = 300;
export function useViewModal(
  isOpen: ModalProps["isOpen"],
  onClose: ModalProps["onClose"],
): viewProps {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef() as MutableRefObject<
  ReturnType<typeof setTimeout>
  >;

  // <LoginModal onClose={onCloseAuthModal} isOpen={isAuthModal} />

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const closeHandler = useCallback(() => {
    if (onClose != null) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeHandler();
      }
    },
    [closeHandler],
  );

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  return {
    isClosing,
    isMounted,
    closeHandler,
    onContentClick,
  };
}
