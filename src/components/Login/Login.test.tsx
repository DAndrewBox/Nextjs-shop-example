import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Login from "./Login";
import ReduxProvider from "@/store/ReduxProvider";
import axios from "axios";

jest.mock("axios");
const axiosMock = jest.mocked(axios);
const showAlertMock = jest.fn();
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: pushMock,
    };
  },
}));

describe("Login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form correctly", () => {
    render(
      <ReduxProvider>
        <Login showAlert={showAlertMock} />
      </ReduxProvider>
    );

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByTestId("txt-disclaimer")).toBeInTheDocument();
  });

  it("handles form submission correctly", async () => {
    const loginData = { email: "test@example.com", password: "password" };
    const loginResponse = { data: { user: {} } };

    axiosMock.mockResolvedValue(loginResponse);

    render(
      <ReduxProvider>
        <Login showAlert={showAlertMock} />
      </ReduxProvider>
    );

    await act(async () => {
      fireEvent.change(screen.getByTestId("input-email--input"), {
        target: { value: loginData.email },
      });
      fireEvent.change(screen.getByTestId("input-password--input"), {
        target: { value: loginData.password },
      });
      fireEvent.click(screen.getByTestId("btn-login"));
    });

    expect(axios).toHaveBeenCalledWith({
      method: "POST",
      url: "/api/auth",
      data: loginData,
    });

    expect(showAlertMock).not.toHaveBeenCalled();
  });

  it("handles form submission with invalid credentials", async () => {
    const loginData = { email: "test@example.com", password: "password" };
    const loginResponse = { data: null };

    axiosMock.mockResolvedValue(loginResponse);

    render(
      <ReduxProvider>
        <Login showAlert={showAlertMock} />
      </ReduxProvider>
    );

    await act(async () => {
      fireEvent.change(screen.getByTestId("input-email--input"), {
        target: { value: loginData.email },
      });
      fireEvent.change(screen.getByTestId("input-password--input"), {
        target: { value: loginData.password },
      });
      fireEvent.click(screen.getByTestId("btn-login"));
    });

    expect(axios).toHaveBeenCalledWith({
      method: "POST",
      url: "/api/auth",
      data: loginData,
    });

    expect(pushMock).not.toHaveBeenCalled();
  });

  it("handles form submission with error", async () => {
    const loginData = { email: "test@example.com", password: "password" };
    const errorMessage = "An error occurred";

    axiosMock.mockRejectedValue(new Error(errorMessage));

    render(
      <ReduxProvider>
        <Login showAlert={showAlertMock} />
      </ReduxProvider>
    );

    await act(async () => {
      fireEvent.change(screen.getByTestId("input-email--input"), {
        target: { value: loginData.email },
      });
      fireEvent.change(screen.getByTestId("input-password--input"), {
        target: { value: loginData.password },
      });
      fireEvent.click(screen.getByTestId("btn-login"));
    });

    expect(axios).toHaveBeenCalledWith({
      method: "POST",
      url: "/api/auth",
      data: loginData,
    });

    expect(pushMock).not.toHaveBeenCalled();
  });
});
