import { AlertType } from "@/types/alert";
import { Wrapper } from "./Alert.styles";

interface AlertProps {
  message: string;
  type: AlertType;
  visible: boolean;
}

interface ColorMapProps {
  [type: string]: string;
}

const Alert = ({ message, type, visible }: AlertProps) => {
  const colorMap: ColorMapProps = {
    success: "#00ff48",
    error: "#FF3E3E",
    warning: "#ff8400",
  };

  return (
    <Wrapper $color={colorMap[type]} className={visible ? "appear" : ""}>
      {message}
    </Wrapper>
  );
};

export default Alert;
