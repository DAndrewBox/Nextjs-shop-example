import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Products from "./Products";
import { Product } from "@/types/products";

describe("Products", () => {
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

  it("Should render the products correctly", () => {
    render(<Products products={products} onAddToCart={() => {}} searchQuery="" onAddToFavorite={() => {}} />);

    // Expect that the product containers are rendered
    const productContainers = screen.getAllByTestId(/^products-\d+$/);
    expect(productContainers).toHaveLength(products.length);

    // Expect that the product names are rendered correctly
    const productNames = screen.getAllByTestId(/^products-name-\d+$/);
    expect(productNames).toHaveLength(products.length);
    expect(productNames[0]).toHaveTextContent("Product 1");
    expect(productNames[1]).toHaveTextContent("Product 2");
    expect(productNames[2]).toHaveTextContent("Product 3");

    // Expect that the "Add to Cart" buttons are rendered
    const addToCartButtons = screen.getAllByTestId(/^btn-product-\d+$/);
    expect(addToCartButtons).toHaveLength(products.length);
  });

  it("Should trigger the onAddToCart callback when the 'Add to Cart' button is clicked", () => {
    const onAddToCart = jest.fn();
    render(<Products products={products} onAddToCart={onAddToCart} searchQuery="" onAddToFavorite={() => {}} />);

    // Simulate clicking the "Add to Cart" button for the first product
    const addToCartButton = screen.getByTestId("btn-product-1");
    fireEvent.click(addToCartButton);

    // Expect that the onAddToCart callback is called with the correct product
    expect(onAddToCart).toHaveBeenCalledWith(products[0]);
  });

  it("Should trim the product name if it exceeds 25 characters", () => {
    const longProductName = "This is a very long product name that exceeds 25 characters";
    const productsWithLongNames: Product[] = [
      { ...defaultProduct, id: 1, title: longProductName, image: "/product1.jpg" },
    ];

    render(
      <Products products={productsWithLongNames} onAddToCart={() => {}} searchQuery="" onAddToFavorite={() => {}} />
    );

    // Expect that the product name is trimmed
    const productName = screen.getByTestId("products-name-0");
    expect(productName).toHaveTextContent("This is a very long produ...");
  });

  it("Should render the 'No products found' message when there are no products and a search query is provided", () => {
    render(<Products products={[]} onAddToCart={() => {}} searchQuery="Product 1" onAddToFavorite={() => {}} />);

    // Expect that the "No products found" message is rendered
    const notFoundMessage = screen.getByText('No products found with name "Product 1"');
    expect(notFoundMessage).toBeInTheDocument();
  });

  it("Should sort the products by title", () => {
    const productsUnsorted: Product[] = [
      { ...defaultProduct, id: 1, title: "Product B", image: "/product1.jpg" },
      { ...defaultProduct, id: 2, title: "Product A", image: "/product2.jpg" },
      { ...defaultProduct, id: 3, title: "Product C", image: "/product3.jpg" },
    ];

    render(<Products products={productsUnsorted} onAddToCart={() => {}} searchQuery="" onAddToFavorite={() => {}} />);

    // Expect that the products are sorted by title
    const productNames = screen.getAllByTestId(/^products-name-\d+$/);
    expect(productNames).toHaveLength(productsUnsorted.length);
    expect(productNames[0]).toHaveTextContent("Product A");
    expect(productNames[1]).toHaveTextContent("Product B");
    expect(productNames[2]).toHaveTextContent("Product C");
  });
});
