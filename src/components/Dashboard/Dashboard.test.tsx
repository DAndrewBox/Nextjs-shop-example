import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import { Product } from "@/types/products";
import ReduxProvider from "@/store/ReduxProvider";

const pushMock = jest.fn();

jest.mock("next/router", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: pushMock,
    };
  },
}));

describe("Dashboard", () => {
  const showAlertMock = jest.fn();
  const setProductsMock = jest.fn();
  const setCartItemsMock = jest.fn();
  const setFavListMock = jest.fn();

  const mockUser = {
    address: {
      geolocation: { lat: "-37.3159", long: "81.1496" },
      city: "kilcoole",
      street: "new road",
      number: 7682,
      zipcode: "12926-3874",
    },
    id: 1,
    email: "john@gmail.com",
    username: "johnd",
    password: "m38rmF$",
    name: { firstname: "john", lastname: "doe" },
    phone: "1-570-236-7033",
    __v: 0,
  };

  const defaultProduct: Product = {
    id: 0,
    title: "",
    image: "",
    price: 0,
    description: "",
    category: "",
    rating: { rate: 0, count: 0 },
  };

  const products: Product[] = [
    { ...defaultProduct, id: 1, title: "Product 1", image: "/product1.jpg" },
    { ...defaultProduct, id: 2, title: "Product 2", image: "/product2.jpg" },
    { ...defaultProduct, id: 3, title: "Product 3", image: "/product3.jpg" },
  ];

  const mockProps = {
    showAlert: showAlertMock,
    loadingContent: false,
    fetchedProducts: {
      allProducts: products,
      products: products,
      cartItems: [products[2]],
      favList: [products[0]],
      setProducts: setProductsMock as (products: Product[]) => void,
      setCartItems: setCartItemsMock as (items: Product[]) => void,
      setFavList: setFavListMock as (items: Product[]) => void,
      loadingContent: false,
    },
    auth: {
      currentUser: mockUser,
      userIsAuthenticated: true,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render loading content when loadingContent prop is true", () => {
    render(
      <ReduxProvider>
        <Dashboard {...mockProps} loadingContent={true} />
      </ReduxProvider>
    );
    expect(screen.getByText("Loading content...")).toBeInTheDocument();
  });

  it("Should render the dashboard correctly", () => {
    render(
      <ReduxProvider>
        <Dashboard {...mockProps} loadingContent={false} />
      </ReduxProvider>
    );
    expect(screen.getByText("Shop Example")).toBeInTheDocument();
    expect(screen.getByText("Welcome again, john. Are you not john?")).toBeInTheDocument();
    expect(screen.getByTestId("dashboard-content")).toBeInTheDocument();
    expect(screen.getByTestId("input-search")).toBeInTheDocument();
    expect(screen.getByTestId("fav-section")).toBeInTheDocument();
    expect(screen.getByTestId("cart-section")).toBeInTheDocument();
    expect(screen.getByTestId("products-section")).toBeInTheDocument();
  });

  it("Should handle search correctly", () => {
    render(
      <ReduxProvider>
        <Dashboard {...mockProps} loadingContent={false} />
      </ReduxProvider>
    );
    const searchInput = screen.getByTestId("input-search--input");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue("");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(setProductsMock).toHaveBeenCalledTimes(1);
  });

  it("Should handle logout correctly", () => {
    render(
      <ReduxProvider>
        <Dashboard {...mockProps} loadingContent={false} />
      </ReduxProvider>
    );
    const logoutButton = screen.getByTestId("btn-logout");
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);
    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith("/login");
  });
});
