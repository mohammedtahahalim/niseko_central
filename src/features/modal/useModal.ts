import { useEffect, useRef, useState, type RefObject } from "react";

interface UseModalProps {
  delay?: number;
}

interface UseModalReturns<P, M> {
  parentRef: RefObject<P | null>;
  modalRef: RefObject<M | null>;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export default function useModal<P extends HTMLElement, M extends HTMLElement>({
  delay = 0,
}: UseModalProps = {}): UseModalReturns<P, M> {
  const parentRef = useRef<P | null>(null);
  const modalRef = useRef<M | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const lastActiveElement = useRef<HTMLElement | null>(null);
  const timerRef = useRef<number | undefined>(undefined);

  const openModal = () => {
    timerRef.current = setTimeout(() => {
      lastActiveElement.current = document.activeElement as HTMLElement;
      setIsOpen(true);
      modalRef.current?.focus();
    }, delay);
  };

  const closeModal = () => {
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
      lastActiveElement.current?.focus();
    }, delay);
  };

  const stopOutsideEvents = (e: Event | UIEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!parentRef.current || !modalRef.current) return;
      if (
        !parentRef.current.contains(e.target as Node) &&
        !modalRef.current.contains(e.target as Node)
      ) {
        closeModal();
      }
    };
    const handleEscapeClick = (e: KeyboardEvent) => {
      if (!parentRef.current || !modalRef.current) return;
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleEscapeClick);
    window.addEventListener("touchmove", stopOutsideEvents);
    window.addEventListener("scroll", stopOutsideEvents);
    window.addEventListener("resize", closeModal);
    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleEscapeClick);
      window.removeEventListener("touchmove", stopOutsideEvents);
      window.removeEventListener("scroll", stopOutsideEvents);
      window.removeEventListener("resize", closeModal);
      clearTimeout(timerRef.current);
    };
  }, [isOpen]);

  return { parentRef, modalRef, isOpen, openModal, closeModal };
}
