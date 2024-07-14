import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Label = styled.label`
  color: #71767d;
  font-size: 0.75rem;
  font-weight: 650;
  margin: 0.25rem 0;
  width: 21.875rem;
  letter-spacing: 0.05rem;
`;

export const TextInput = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  color: #71767d;

  font-size: 1rem; // @To-Fix: I don't have the font-size value on figma

  width: 21.875rem;
  height: 2.5rem;

  border: 1px solid #e8e9ea;
  border-radius: 2rem;

  background: #ffffff;

  flex: none;
  flex-grow: 0;
`;
