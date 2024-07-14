import styled from "styled-components";

export const Wrapper = styled.i`
  *::-webkit-scrollbar {
    width: 0.5rem;
  }

  *::-webkit-scrollbar-track {
    background: #ffffff66;
    border-radius: 0.25rem;
    margin-left: 2rem;
    margin-right: 2rem;
  }

  *::-webkit-scrollbar-thumb {
    background: #ffffff99;
    border-radius: 0.25rem;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: #ffffffcc;
  }

  *::-webkit-scrollbar-button {
    display: none;
  }
`;
