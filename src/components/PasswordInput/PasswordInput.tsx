import { useState } from "react";
import Input from "@common/Input/Input";
import { PasswordContainer, ToggleButton } from "./PasswordInput.styles";
import Image from "next/image";
import ViewOff from "@icons/ViewOff.svg";
import ViewOn from "@icons/ViewOn.svg";

interface PasswordInputProps {
  value: string;
  required: boolean;
  dataTestId?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput = ({ value, required, dataTestId = "", onChange }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PasswordContainer data-testid={`${dataTestId}--container`}>
      <Input
        label="Password"
        autocomplete="current-password"
        type={!showPassword ? "password" : "text"}
        value={value}
        required={required}
        onChange={onChange}
        dataTestId={dataTestId}
      />

      <ToggleButton onClick={() => setShowPassword(!showPassword)} data-testid={`${dataTestId}--toggle`}>
        <Image src={showPassword ? ViewOn : ViewOff} alt="eye" width={24} height={24} />
      </ToggleButton>
    </PasswordContainer>
  );
};

export default PasswordInput;
