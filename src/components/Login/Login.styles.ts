import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ddc38f;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  justify-content: center;
  position: absolute;
  width: 29.063rem;
  min-height: 27.688rem;

  background: #ffffff;

  box-shadow: 0px 0px 9px rgba(167, 169, 172, 0.25);
  border-radius: 24px;
`;

export const LogoImageContainer = styled.div`
  margin-bottom: 1rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  & > img {
    border-radius: 1.25rem;
    width: 7.438rem;
    height: 7.438rem;
  }
`;

export const Title = styled.h2`
  font-size: 1rem;
  font-weight: 500;

  margin-bottom: 1rem;
  color: #54575c;
`;

export const Disclaimer = styled.p`
  margin-top: 1rem;
  font-size: 0.75rem;
  line-height: 0.88rem;
  color: #414042;
  text-align: center;
  font-weight: 300;
  max-width: 12.5rem;
  font-family: "Work Sans", sans-serif;

  & > a {
    color: #414042;
    text-decoration: underline;
    font-size: 0.75rem;
    font-family: "Work Sans", sans-serif;
  }
`;
