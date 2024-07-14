import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal", () => {
  it("Should render modal when open is true", () => {
    render(<Modal open={true} />);
    const modalElement = screen.getByTestId("modal-overlay");
    expect(modalElement).toBeInTheDocument();
  });

  it("Should not render modal when open is false", () => {
    render(<Modal open={false} />);
    const modalElement = screen.queryByTestId("modal-overlay");
    expect(modalElement).not.toBeInTheDocument();
  });

  it("Should render title correctly", () => {
    const title = "Test Modal";
    render(<Modal open={true} title={title} />);
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it("Should call onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(<Modal open={true} useCloseButton={true} onClose={onCloseMock} />);
    const closeButton = screen.getByAltText("Close");
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("Should call onClickOutside when clicking outside the modal", () => {
    const onClickOutsideMock = jest.fn();
    render(<Modal open={true} onClickOutside={onClickOutsideMock} />);
    const modalOverlay = screen.getByTestId("modal-overlay");
    fireEvent.mouseDown(modalOverlay);
    expect(onClickOutsideMock).toHaveBeenCalled();
  });

  it("Should call onClose when pressing the Escape key", () => {
    const onCloseMock = jest.fn();
    render(<Modal open={true} onClose={onCloseMock} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onCloseMock).toHaveBeenCalled();
  });
});
