import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Favorites from "./Favorites";
import { Product } from "@/types/products";

describe("Favorites", () => {
  const defaultProduct: Product = {
    id: 0,
    title: "",
    image: "",
    price: 0,
    description: "",
    category: "",
    rating: { rate: 0, count: 0 },
  };

  const favorites: Product[] = [
    { ...defaultProduct, id: 1, title: "Product 1", image: "/product1.jpg" },
    { ...defaultProduct, id: 2, title: "Product 2", image: "/product2.jpg" },
    { ...defaultProduct, id: 3, title: "Product 3", image: "/product3.jpg" },
  ];

  it("renders the favorites correctly", () => {
    render(<Favorites favorites={favorites} />);

    // Should render the title and container
    expect(screen.getByTestId("fav-section")).toBeInTheDocument();
    expect(screen.getByText("Drag and drop to add your favourites")).toBeInTheDocument();

    // Assert that the favorites are rendered correctly
    expect(screen.getByTestId("fav-item-0")).toBeInTheDocument();
    expect(screen.getByTestId("fav-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("fav-item-2")).toBeInTheDocument();

    // Assert that the extra empty slot is rendered correctly

    expect(screen.getByText("Drag more items here!")).toBeInTheDocument();
    expect(screen.getByTestId("fav-empty-extra")).toBeInTheDocument();
  });

  it("renders the empty slots correctly", () => {
    const emptyFavorites: Product[] = [];
    render(<Favorites favorites={emptyFavorites} />);

    // Assert that the 3 empty slots are rendered correctly
    expect(screen.getByTestId("fav-empty-0")).toBeInTheDocument();
    expect(screen.getByTestId("fav-empty-1")).toBeInTheDocument();
    expect(screen.getByTestId("fav-empty-2")).toBeInTheDocument();
  });

  it("renders 1 used slot and 2 empty slots correctly", () => {
    const partialFavorites: Product[] = [favorites[0]];
    render(<Favorites favorites={partialFavorites} />);

    // Assert that the used slot is rendered correctly
    expect(screen.getByTestId("fav-item-0")).toBeInTheDocument();

    // Assert that the 2 empty slots are rendered correctly
    expect(screen.getByTestId("fav-empty-1")).toBeInTheDocument();
    expect(screen.getByTestId("fav-empty-2")).toBeInTheDocument();
  });
});
