import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Scrollable from "./Scrollable";

describe("Scrollable", () => {
  it("Should render children correctly", () => {
    const children = <div>Test Children</div>;
    const { getByText } = render(<Scrollable>{children}</Scrollable>);
    expect(getByText("Test Children")).toBeInTheDocument();
  });
});
