import { modalAtom } from "@/store";
import { useAtom } from "jotai";

const useModal = () => {
  const [isOpen, setIsOpen] = useAtom(modalAtom);
  return {
    isOpen: isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};

export default useModal;
