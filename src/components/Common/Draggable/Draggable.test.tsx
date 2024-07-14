import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./Draggable";

describe("Draggable", () => {
  it("Should render children", () => {
    const { getByText } = render(
      <DndContext>
        <Draggable id="test-draggable">
          <p>Hello World</p>
        </Draggable>
      </DndContext>
    );

    expect(getByText("Hello World")).toBeInTheDocument();
  });
});
