import type { AppProps } from "next/app";
import { persistor } from "@/store";
import "@/styles/globals.css";
import Alert from "@common/Alert/Alert";
import { useEffect, useState } from "react";
import { ALERT_TYPE, AlertType } from "@/types/alert";
import { PersistGate } from "redux-persist/integration/react";
import ReduxProvider from "@/store/ReduxProvider";

export default function App({ Component, pageProps }: AppProps) {
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<AlertType>(ALERT_TYPE.SUCCESS);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [visible]);

  const newPageProps = {
    ...pageProps,
    showAlert: ({ message, type }: { message: string; type: AlertType }) => {
      setVisible(true);
      setMessage(message);
      setType(type);
    },
  };

  return (
    <ReduxProvider>
      <PersistGate loading={null} persistor={persistor}>
        {message !== "" && <Alert message={message} visible={visible} type={type} />}
        <Component {...newPageProps} />
      </PersistGate>
    </ReduxProvider>
  );
}
