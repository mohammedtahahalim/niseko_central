import { useEffect, useRef, useState, type RefObject } from "react";

interface UseModalRefReturns<TParent, TModal> {
  parentRef: RefObject<TParent | null>;
  modalRef: RefObject<TModal | null>;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export default function useModal<
  TParent extends HTMLElement,
  TModal extends HTMLElement
>(): UseModalRefReturns<TParent, TModal> {
  const parentRef = useRef<TParent | null>(null);
  const modalRef = useRef<TModal | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const lastActive = useRef<HTMLElement | null>(null);

  const openModal = () => {
    setIsOpen(true);
    lastActive.current = document.activeElement as HTMLElement | null;
    modalRef.current?.focus();
  };
  const closeModal = () => {
    setIsOpen(false);
    try {
      lastActive.current?.focus();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const detectClickOutsideModal = (e: MouseEvent) => {
      if (
        parentRef.current &&
        modalRef.current &&
        !parentRef.current.contains(e.target as Node) &&
        !modalRef.current.contains(e.target as Node)
      ) {
        closeModal();
      }
    };
    window.addEventListener("click", detectClickOutsideModal);
    return () => {
      window.removeEventListener("click", detectClickOutsideModal);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const stopOtherEvents = (e: Event) => e.stopPropagation();
    window.addEventListener("scroll", stopOtherEvents, { passive: false });
    window.addEventListener("touchmove", stopOtherEvents, { passive: false });
    return () => {
      window.removeEventListener("scroll", stopOtherEvents);
      window.removeEventListener("touchmove", stopOtherEvents);
    };
  }, [isOpen]);

  useEffect(() => {
    const escapeClick = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeModal();
    };
    window.addEventListener("keydown", escapeClick);
    return () => window.removeEventListener("keydown", escapeClick);
  }, [isOpen]);

  return { parentRef, modalRef, isOpen, openModal, closeModal };
}
