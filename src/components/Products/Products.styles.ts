import styled from "styled-components";
import Image from "next/image";

export const Wrapper = styled.div`
  margin-top: 1.125rem;
  min-width: 30.75rem;

  background: #f1c97b;
  box-shadow: 0px 0px 9px rgba(167, 169, 172, 0.25);
  border-radius: 24px;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr 1fr 1fr;

  height: 39.5rem;
  margin: 1.5rem;
  gap: 2.5rem;

  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 1366px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr 1fr;
    height: 28.5rem;
  }
    
  @media (max-height: 720px) {
    height: 25.5rem;
  }
`;

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ProductImage = styled(Image)`
  border-radius: 1.25rem;
  box-shadow: 0px 4px 4px 0px #00000040;
  margin-bottom: 0.5rem;
  object-fit: contain;
  background-color: #ffffff;
  z-index: 1;
`;

export const ProductName = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 0.88rem;
  color: #050505;
  margin-bottom: 0.5rem;
  padding: 0 0.5rem;
`;

export const NotFoundMessage = styled.h3`
  grid-column: 1 / -1;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #050505;
`;
