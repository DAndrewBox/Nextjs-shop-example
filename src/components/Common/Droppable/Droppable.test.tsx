import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import Droppable from "./Droppable";

describe("Droppable", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <Droppable id="test-droppable">
        <div>Test Children</div>
      </Droppable>
    );

    expect(getByText("Test Children")).toBeInTheDocument();
  });
});
