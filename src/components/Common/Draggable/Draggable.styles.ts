import styled from "styled-components";

export const DraggableItem = styled.button`
  border: none;
  background-color: transparent;
  z-index: 1;
  transition: transform 0.05s linear;

  &:hover {
    cursor: grab;
  }

  &:active {
    cursor: grabbing;
    z-index: 2;
  }
`;
