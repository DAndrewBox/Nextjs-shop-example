import styled from "styled-components";
import Image from "next/image";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #05050580;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  justify-content: flex-start;

  position: fixed;
  min-width: 20rem;
  min-height: 10rem;
  max-width: 40%;

  background: #ffffff;

  box-shadow: 0px 0px 9px rgba(167, 169, 172, 0.25);
  border-radius: 1.5rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 1rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #050505;
`;

export const CloseButton = styled(Image)`
  background-color: transparent;
  border: none;
  cursor: pointer;

  user-select: none;

  &:hover {
    background-color: #f5f5f5;
    border-radius: 50%;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  font-family: "Work Sans", sans-serif;
  font-weight: 500;
  font-size: 1rem;
  color: #050505;

  padding-bottom: 1.5rem;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  gap: 1rem;
  padding-top: 1rem;
`;
