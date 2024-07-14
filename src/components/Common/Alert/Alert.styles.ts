import styled from "styled-components";

export const Wrapper = styled.div<{ $color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
  background-color: ${(props) => props.$color};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  border-radius: 0 0 2rem 2rem;

  font-family: "Work Sans", sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
  color: #ffffff;

  transform: translateY(-3rem);
  transition: transform 0.25s ease-in;

  &.appear {
    transform: translateY(0rem);
  }
`;
