import { InputContainer, Label, TextInput } from "./Input.styles";

interface InputProps {
  type: string;
  value: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  autocomplete?: string;
  dataTestId?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  value,
  label,
  required = false,
  placeholder = "",
  autocomplete = "",
  dataTestId = "",
  onChange = () => {},
}: InputProps) => {
  return (
    <InputContainer data-testid={dataTestId}>
      {label && <Label data-testid={`${dataTestId}--label`}>{label}</Label>}
      <TextInput
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        autoComplete={autocomplete}
        onChange={onChange}
        data-testid={`${dataTestId}--input`}
      />
    </InputContainer>
  );
};

export default Input;
