import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Alert from "./Alert";

describe("Alert component", () => {
  it("Should render the message correctly", () => {
    const message = "This is a test message";
    const { getByText } = render(<Alert message={message} type="success" visible={true} />);
    expect(getByText(message)).toBeInTheDocument();
  });

  it("Should apply the correct color based on the type prop", () => {
    const { container } = render(<Alert message="Test" type="error" visible={true} />);
    expect(container.firstChild).toHaveStyle("background-color: #FF3E3E");
  });

  it("Should apply the 'appear' class when visible prop is true", () => {
    const { container } = render(<Alert message="Test" type="warning" visible={true} />);
    expect(container.firstChild).toHaveClass("appear");
  });

  it("Should not apply the 'appear' class when visible prop is false", () => {
    const { container } = render(<Alert message="Test" type="success" visible={false} />);
    expect(container.firstChild).not.toHaveClass("appear");
  });
});
