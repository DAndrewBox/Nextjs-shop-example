import styled from "styled-components";

export const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > :last-child {
    height: 0;
  }
`;

export const ToggleButton = styled.i`
  background: none;
  border: none;
  font-weight: 650;
  cursor: pointer;
  align-self: flex-end;
  transform: translate(-1rem, -3rem);
`;
