import Login from "@/components/Login/Login";
import { getReduxStore } from "@/store";
import { ALERT_MESSAGES, ALERT_TYPE } from "@/types/alert";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

interface LoginPageProps {
  showAlert: (alert: { message: string; type: string }) => void;
}

const LoginPage = (props: LoginPageProps): ReactElement => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const { isAuthenticated } = getReduxStore().auth;
    if (isAuthenticated) {
      router.push("/dashboard");
      return;
    }

    const error = searchParams.get("error");
    if (error === "auth") {
      props.showAlert({
        message: ALERT_MESSAGES.AUTH_FAILED,
        type: ALERT_TYPE.ERROR,
      });
    }
  }, []);

  return <Login {...props} />;
};

export default LoginPage;
