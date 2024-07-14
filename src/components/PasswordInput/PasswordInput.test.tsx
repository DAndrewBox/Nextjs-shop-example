import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import PasswordInput from "./PasswordInput";

describe("PasswordInput", () => {
  it("Should render the input field with the correct label", () => {
    render(<PasswordInput value="" required={true} onChange={() => {}} dataTestId="password-input" />);
    const inputElement = screen.getByTestId("password-input--input");
    expect(inputElement).toBeInTheDocument();
  });

  it("Should toggle the password visibility when the toggle button is clicked", () => {
    render(<PasswordInput value="" required={true} onChange={() => {}} dataTestId="password-input" />);
    const toggleButton = screen.getByTestId("password-input--toggle");
    const inputElement = screen.getByTestId("password-input--input") as HTMLInputElement;

    // Password is hidden by default
    expect(inputElement.type).toBe("password");

    // Click the toggle button
    fireEvent.click(toggleButton);

    // Password should be visible
    expect(inputElement.type).toBe("text");

    // Click the toggle button again
    fireEvent.click(toggleButton);

    // Password should be hidden again
    expect(inputElement.type).toBe("password");
  });

  it("Should call the onChange function when the input value changes", () => {
    const onChangeMock = jest.fn();
    render(<PasswordInput value="" required={true} onChange={onChangeMock} dataTestId="password-input" />);
    const inputElement = screen.getByTestId("password-input--input") as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: "test" } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
