import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "./Cart";
import { Product } from "@/types/products";

describe("Cart", () => {
  const defaultProduct: Product = {
    id: 0,
    title: "",
    image: "",
    price: 0,
    description: "",
    category: "",
    rating: { rate: 0, count: 0 },
  };
  const cartItems: Product[] = [
    { ...defaultProduct, id: 1, title: "Product 1", image: "/product1.jpg" },
    { ...defaultProduct, id: 2, title: "Product 2", image: "/product2.jpg" },
    { ...defaultProduct, id: 3, title: "Product 3", image: "/product3.jpg" },
  ];

  it("renders the cart section", () => {
    render(<Cart cartItems={cartItems} onRemoveItem={() => {}} onBuyNow={() => {}} />);
    const cartSection = screen.getByTestId("cart-section");
    expect(cartSection).toBeInTheDocument();
  });

  it("renders the cart title", () => {
    render(<Cart cartItems={cartItems} onRemoveItem={() => {}} onBuyNow={() => {}} />);
    const cartTitle = screen.getByText("Cart");
    expect(cartTitle).toBeInTheDocument();
  });

  it("renders the cart items", () => {
    render(<Cart cartItems={cartItems} onRemoveItem={() => {}} onBuyNow={() => {}} />);
    const cartItemsContainer = screen.getByTestId("cart-items-container");
    expect(cartItemsContainer).toBeInTheDocument();
    // Expect 3 items + extra empty slot
    expect(cartItemsContainer.children.length).toBe(cartItems.length + 1);
    expect(screen.getByTestId("cart-item-0")).toBeInTheDocument();
    expect(screen.getByTestId("cart-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("cart-item-2")).toBeInTheDocument();
    expect(screen.getByTestId("cart-item-extra")).toBeInTheDocument();
  });

  it("renders the cart empty slots", () => {
    render(<Cart cartItems={[]} onRemoveItem={() => {}} onBuyNow={() => {}} />);
    const cartEmptySlots = screen.getAllByTestId(/cart-empty-\d+/);
    expect(cartEmptySlots.length).toBeGreaterThan(0);
  });

  it("renders the buy now button", () => {
    render(<Cart cartItems={cartItems} onRemoveItem={() => {}} onBuyNow={() => {}} />);
    const buyNowButton = screen.getByText("Buy now");
    expect(buyNowButton).toBeInTheDocument();
  });

  it("disables the buy now button when cart is empty", () => {
    render(<Cart cartItems={[]} onRemoveItem={() => {}} onBuyNow={() => {}} />);
    const buyNowButton = screen.getByText("Buy now");
    expect(buyNowButton).toBeDisabled();
  });

  it("calls onRemoveItem when remove button is clicked", () => {
    const onRemoveItem = jest.fn();
    render(<Cart cartItems={cartItems} onRemoveItem={onRemoveItem} onBuyNow={() => {}} />);
    const removeButtons = screen.getAllByTestId(/cart-item-\d+-remove/);
    removeButtons.forEach((button) => {
      fireEvent.click(button);
    });
    expect(onRemoveItem).toHaveBeenCalledTimes(cartItems.length);
  });

  it("calls onBuyNow when buy now button is clicked", () => {
    const onBuyNow = jest.fn();
    render(<Cart cartItems={cartItems} onRemoveItem={() => {}} onBuyNow={onBuyNow} />);
    const buyNowButton = screen.getByText("Buy now");
    fireEvent.click(buyNowButton);
    expect(onBuyNow).toHaveBeenCalledTimes(1);
  });
});
