import Image from "next/image";
import styled from "styled-components";

export const Wrapper = styled.div`
  grid-column: 9 / span 1;
  width: 9.625rem;
  height: 45.75rem;
  border-radius: 1.5rem;
  padding: 0.5rem;
  margin-right: 3.5rem;
  margin-top: 12.625rem;

  background-color: #f8bf50;
  box-shadow: 0px 0px 9px 0px #a7a9ac40;

  @media (max-width: 1366px) {
    margin-left: 1.75rem;
    margin-right: 1.75rem;
    height: 34.75rem;
  }

  @media (max-height: 720px) {
    height: 31.75rem;
  }
`;

export const Title = styled.h3`
  font-family: "Work Sans", sans-serif;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1rem;
  color: #050505;
  text-align: left;
  padding: 1rem;
  padding-bottom: 0;
  margin-bottom: 1.875rem;
`;

export const ItemsContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  gap: 1.875rem;
  padding: 0 0.5rem;
  height: 36.5rem;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 1366px) {
    height: 25rem;
  }

  @media (max-height: 720px) {
    height: 22.5rem;
  }
`;

export const ItemEmptySlot = styled.div`
  display: flex;
  justify-content: center;
  justify-self: center;
  align-items: center;
  text-align: center;

  width: 6.563rem;
  height: 6.563rem;
  border-radius: 20px;

  font-family: "Work Sans", sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  color: #05050599;
  font-style: normal;

  background-color: #ffffff33;
  box-shadow: 0px 4px 4px 0px #00000040 inset;
`;

export const ItemImage = styled(Image)`
  width: 6.563rem;
  height: 6.563rem;
  border-radius: 20px;
  object-fit: contain;
  background-color: #ffffff;
`;

export const DragOverlay = styled.div`
  position: absolute;
  width: 9.625rem;
  height: 45.875rem;
  border: 4px solid #ffffff80;
  border-radius: 20px;
  padding: 1.5rem;
  transform: translate(-0.5rem, -7.5rem);
  z-index: 2;

  @media (max-width: 1366px) {
    height: 35rem;
  }

  @media (max-height: 720px) {
    height: 31.75rem;
  }
`;
