import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return {
    isOpen: isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};

export default useModal;
