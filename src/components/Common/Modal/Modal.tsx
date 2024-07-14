import { ReactNode, useEffect, useRef } from "react";
import { Actions, CloseButton, Content, Header, Overlay, Title, Wrapper } from "./Modal.styles";
import Close from "@icons/Close.svg";

interface ModalProps {
  open: boolean;
  title?: string;
  useCloseButton?: boolean;
  content?: ReactNode;
  actions?: ReactNode;
  dataTestId?: string;
  onClickOutside?: () => void;
  onClose?: () => void;
}

const Modal = ({
  open,
  title = "",
  useCloseButton = false,
  content,
  actions,
  dataTestId = "",
  onClickOutside = undefined,
  onClose = undefined,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseButton = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (onClickOutside && modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      if (event.key === "Escape") {
        handleCloseButton();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!open) return null;

  return (
    <Overlay data-testid="modal-overlay">
      <Wrapper ref={modalRef} data-testid={dataTestId}>
        <Header>
          <Title>{title}</Title>
          {useCloseButton && <CloseButton src={Close} alt="Close" onClick={handleCloseButton} />}
        </Header>
        <Content data-testid={`${dataTestId}--content`}>{content}</Content>
        <Actions data-testid={`${dataTestId}--actions`}>{actions}</Actions>
      </Wrapper>
    </Overlay>
  );
};

export default Modal;
