import styled from "styled-components";

export const ButtonComponent = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;

  color: #ffffff;
  font-family: "Work Sans", sans-serif;
  font-size: 1rem;
  font-weight: 500;

  background: #a37f39;
  border: none;

  &:hover {
    background: #c4a063;
    cursor: pointer;
  }

  &:disabled {
    background: #c4c4c4;
    cursor: not-allowed;
  }

  &.large-button {
    width: 19.063rem;
    height: 2.5rem;
    border-radius: 2rem;
  }

  &.small-button {
    width: 6.563rem;
    height: 2rem;
    border-radius: 0.813rem;
    font-size: .75rem;
    font-weight: 600;
  }
`;
