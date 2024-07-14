import Image from "next/image";
import styled from "styled-components";

export const Wrapper = styled.div`
  grid-column: 10 / span 3;
  display: grid;
  grid-template-rows: repeat(12, 1fr);
  width: 100%;
  height: 100%;
  max-height: 100vh;
  padding: 0 0.5rem;
  background-color: #f1c97b;
  box-shadow: 0px 0px 9px 0px #a7a9ac40;
  z-index: 1;
  overflow: hidden;

  & > span {
    grid-row: 2 / span 10;
    padding-bottom: 1rem;
  }

  & > button {
    grid-row: 12;
    align-self: end;
    width: 80%;
    margin: auto;
    margin-bottom: 2.375rem;
  }
`;

export const Title = styled.h3`
  font-family: "Work Sans", sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #000000;
  padding: 1rem;
  grid-row: 1;
`;

export const CartItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 1fr);
  height: 100%;
  padding: 1rem;
  gap: 2.5rem;
  overflow-y: auto;
  overflow-x: hidden;

  margin-right: 0.125rem;

  @media (max-width: 1366px) {
    gap: 1.5rem;
  }

  @media (max-width: 1280px) {
    gap: 1.4rem;
  }
`;

export const CartEmptySlot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 100%;
  height: 6.563rem;
  background-color: #f4d495;
  border-radius: 1.25rem;
  box-shadow: 0px 4px 4px 0px #00000040 inset;

  font-family: "Work Sans", sans-serif;
  font-weight: 500;
  font-size: 1rem;
  color: #05050599;
  font-style: normal;

  padding: 0.5rem;

  background-color: #ffffff33;
  box-shadow: 0px 4px 4px 0px #00000040 inset;
`;

export const CartItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 6.563rem;
  margin: 0 0.531rem;
  gap: 0.5rem;
`;

export const CartItemImage = styled(Image)`
  border-radius: 1.25rem;
  box-shadow: 0px 4px 4px 0px #00000040;
  object-fit: contain;
  background-color: #ffffff;
  min-width: 105px;
`;

export const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.25rem;
  margin: 0.25rem 0;
  justify-content: space-between;

  & > :last-child {
    align-self: flex-end;
  }
`;

export const CartItemTitle = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 0.88rem;
  color: #000000;
  margin: 0;
`;

export const CartRemoveButton = styled(Image)`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  border-radius: 1.5rem;
  background-color: #f98c8c33;
  box-shadow: 0px 4px 4px 0px #00000040;
`;
