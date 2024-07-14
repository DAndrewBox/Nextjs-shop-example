import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render input component with label and input field", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Input
        type="text"
        value=""
        label="Username"
        required
        placeholder="Enter your username"
        autocomplete="username"
        dataTestId="input-component"
        onChange={onChange}
      />
    );

    const inputLabel = getByTestId("input-component--label");
    const inputField = getByTestId("input-component--input");

    expect(inputLabel).toBeInTheDocument();
    expect(inputLabel).toHaveTextContent("Username");

    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveAttribute("type", "text");
    expect(inputField).toHaveAttribute("value", "");
    expect(inputField).toHaveAttribute("required");
    expect(inputField).toHaveAttribute("placeholder", "Enter your username");
    expect(inputField).toHaveAttribute("autocomplete", "username");
  });

  it("Should render input component without label", () => {
    const onChange = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <Input type="text" value="" label="" dataTestId="input-component" onChange={onChange} />
    );

    const inputLabel = queryByTestId("input-component--label");
    const inputField = getByTestId("input-component--input");

    expect(inputLabel).not.toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
  });

  it("Should change input value and call onChange", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Input
        type="text"
        value=""
        label="Username"
        required
        placeholder="Enter your username"
        autocomplete="username"
        dataTestId="input-component"
        onChange={onChange}
      />
    );

    const inputField = getByTestId("input-component--input");

    fireEvent.change(inputField, { target: { value: "test" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
