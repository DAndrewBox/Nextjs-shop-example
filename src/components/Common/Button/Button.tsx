import { ButtonComponent } from "./Button.styles";

interface ButtonProps {
  label: string;
  size?: "small" | "large";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  dataTestId?: string;
  onClick?: () => void;
}

const Button = ({
  label,
  type = "button",
  size = "large",
  disabled = false,
  dataTestId = "",
  onClick,
}: ButtonProps) => {
  return (
    <ButtonComponent
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}
      className={`${size}-button`}
    >
      {label}
    </ButtonComponent>
  );
};

export default Button;
