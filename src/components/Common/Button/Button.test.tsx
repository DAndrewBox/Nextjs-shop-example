import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("Should render a large button with label", () => {
    render(<Button label="Click me" size="large" />);
    const buttonElement = screen.getByText("Click me");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toBe("BUTTON");
    expect(buttonElement).toHaveClass("large-button");
  });

  it("Should render a small button with label", () => {
    render(<Button label="Click me" size="small" />);
    const buttonElement = screen.getByText("Click me");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toBe("BUTTON");
    expect(buttonElement).toHaveClass("small-button");
  });

  it("Should call onClick handler when clicked", () => {
    const onClickMock = jest.fn();
    render(<Button label="Click me" onClick={onClickMock} />);
    const buttonElement = screen.getByText("Click me");
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });

  it("Should disable the button when disabled prop is true", () => {
    render(<Button label="Click me" disabled />);
    const buttonElement = screen.getByText("Click me");
    expect(buttonElement).toBeDisabled();
  });

  it("Should apply data-testid attribute when dataTestId prop is provided", () => {
    render(<Button label="Click me" dataTestId="test-button" />);
    const buttonElement = screen.getByTestId("test-button");
    expect(buttonElement).toBeInTheDocument();
  });
});
