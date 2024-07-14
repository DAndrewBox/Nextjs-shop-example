import { login } from "@store/slices/authSlice";
import { User } from "@/types/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { Wrapper, FormContainer, Disclaimer, Title, LogoImageContainer } from "./Login.styles";
import Input from "@common/Input/Input";
import PasswordInput from "../PasswordInput/PasswordInput";
import Button from "@common/Button/Button";
import LoginLogoImage from "@images/loginLogo.png";
import Image from "next/image";
import { ALERT_MESSAGES, ALERT_TYPE } from "@/types/alert";
import Link from "next/link";

interface LoginProps {
  showAlert: (alert: { message: string; type: string }) => void;
}

const Login = (props: LoginProps): ReactElement => {
  const { showAlert } = props;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (data: User) => {
    dispatch(login(data));
    router.push("/dashboard");
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios({
      method: "POST",
      url: "/api/auth",
      data: { email, password },
    })
      .then((res) => {
        if (res.data) {
          handleLogin(res.data);
          return;
        }

        showAlert({
          message: ALERT_MESSAGES.INVALID_CREDENTIALS,
          type: ALERT_TYPE.WARNING,
        });
      })
      .catch(() => {
        showAlert({
          message: ALERT_MESSAGES.ERROR_GENERIC,
          type: ALERT_TYPE.ERROR,
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Wrapper>
      <FormContainer onSubmit={handleSubmit}>
        <LogoImageContainer>
          <Image src={LoginLogoImage} alt="logo" data-testid="img-logo" />
        </LogoImageContainer>
        <Title>Inicia Sesión</Title>
        <Input
          label="Email"
          type="email"
          value={email}
          autocomplete="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          dataTestId="input-email"
        />
        <PasswordInput
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          dataTestId="input-password"
        />
        <Button type="submit" label="Login" disabled={!email || !password || isSubmitting} dataTestId="btn-login" />
        <Disclaimer data-testid="txt-disclaimer">
          <Link href="#">Términos y condiciones de uso</Link> y el <Link href="#">Aviso de privacidad</Link> de
          Multiapoyo.
        </Disclaimer>
      </FormContainer>
    </Wrapper>
  );
};

export default Login;
