"use client";

import { ReactNode, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

interface ModalPortalProps {
  children: ReactNode;
  isOpen: boolean;
}

const subscribe = () => {
  return () => {};
};

export function ModalPortal({
  children,
  isOpen,
}: ModalPortalProps) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!mounted || !isOpen) {
    return null;
  }


  return createPortal(
    children,
    document.body,
  );
}