import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  min-height: 100vh;
  background-color: #ddc38f;
`;

export const MainContainer = styled.div`
  grid-column: 1 / span 7;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;

  margin-left: 2.5rem;
  margin-top: 2.5rem;

  & > div> label {
    font-size: 1rem;
    font-weight: 700;
    color: #050505;
    margin-bottom: 0.625rem;
  }

  & > div > input {
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-family: "Work Sans", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 3.75rem;
  color: #050505;
  text-align: left;
`;

export const Subtitle = styled.h2`
  font-family: "Work Sans", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  color: #050505;
  text-align: left;
  margin-bottom: 0.875rem;

  & > span {
    font-size: 1rem;
    color: #050505;
    text-decoration: underline;

    &:hover {
      cursor: pointer;
    }
  }
`;
