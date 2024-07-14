import "@testing-library/jest-dom";
import { handleDragStart, handleDragEnd, handleSearch } from "./Dashboard.utils";
import { Product } from "@/types/products";

describe("Dashboard Utils", () => {
  const defaultProduct: Product = {
    id: 0,
    title: "",
    image: "",
    price: 0,
    description: "",
    category: "",
    rating: { rate: 0, count: 0 },
  };

  describe("handleDragStart", () => {
    it("should set active drag product when active is truthy", () => {
      const allProducts = [{ ...defaultProduct, id: 1, title: "Product 1" }];
      const setActiveDragProduct = jest.fn();
      const active = { id: "drag-1" };

      handleDragStart({ allProducts, setActiveDragProduct, active });

      expect(setActiveDragProduct).toHaveBeenCalledWith(allProducts[0]);
    });

    it("should not set active drag product when active is falsy", () => {
      const allProducts = [{ id: 1, title: "Product 1" }];
      const setActiveDragProduct = jest.fn();
      const active = null;

      handleDragStart({ allProducts, setActiveDragProduct, active });

      expect(setActiveDragProduct).not.toHaveBeenCalled();
    });
  });

  describe("handleDragEnd", () => {
    it("should handle open modal when active drag product is favorite and dropped outside favorite list and over is falsy", () => {
      const activeDragProduct = { ...defaultProduct, id: 1, title: "Product 1" };
      const handleOpenModal = jest.fn();
      const handleAddToFavorites = jest.fn();
      const handleAddToCart = jest.fn();
      const handleRemoveFromCart = jest.fn();
      const setActiveDragProduct = jest.fn();
      const over = null;
      const active = { id: "drag-favorite-1" };

      handleDragEnd({
        over,
        active,
        activeDragProduct,
        handleOpenModal,
        handleAddToFavorites,
        handleAddToCart,
        handleRemoveFromCart,
        setActiveDragProduct,
      });

      expect(handleOpenModal).toHaveBeenCalledWith(true);
      expect(handleAddToFavorites).not.toHaveBeenCalled();
      expect(handleAddToCart).not.toHaveBeenCalled();
      expect(handleRemoveFromCart).not.toHaveBeenCalled();
    });

    it("should handle remove from cart when active drag product is dropped outside and over is falsy and active id includes 'cart'", () => {
      const activeDragProduct = { ...defaultProduct, id: 1, title: "Product 1" };
      const handleOpenModal = jest.fn();
      const handleAddToFavorites = jest.fn();
      const handleAddToCart = jest.fn();
      const handleRemoveFromCart = jest.fn();
      const setActiveDragProduct = jest.fn();
      const over = null;
      const active = { id: "item-cart-1" };

      handleDragEnd({
        over,
        active,
        activeDragProduct,
        handleOpenModal,
        handleAddToFavorites,
        handleAddToCart,
        handleRemoveFromCart,
        setActiveDragProduct,
      });

      expect(handleRemoveFromCart).toHaveBeenCalledWith(activeDragProduct);
      expect(setActiveDragProduct).toHaveBeenCalledWith(null);
    });

    it("should handle add to favorites when active drag product is dropped on favorites drop zone", () => {
      const activeDragProduct = { ...defaultProduct, id: 1, title: "Product 1" };
      const handleOpenModal = jest.fn();
      const handleAddToFavorites = jest.fn();
      const handleAddToCart = jest.fn();
      const handleRemoveFromCart = jest.fn();
      const setActiveDragProduct = jest.fn();
      const over = { id: "dnd-favorites" };
      const active = { id: "drag-1" };

      handleDragEnd({
        over,
        active,
        activeDragProduct,
        handleOpenModal,
        handleAddToFavorites,
        handleAddToCart,
        handleRemoveFromCart,
        setActiveDragProduct,
      });

      expect(handleOpenModal).not.toHaveBeenCalled();
      expect(handleAddToFavorites).toHaveBeenCalledWith(activeDragProduct);
      expect(handleAddToCart).not.toHaveBeenCalled();
      expect(handleRemoveFromCart).not.toHaveBeenCalled();
      expect(setActiveDragProduct).toHaveBeenCalledWith(null);
    });

    it("should handle add to cart when active drag product is dropped on cart drop zone", () => {
      const activeDragProduct = { ...defaultProduct, id: 1, title: "Product 1" };
      const handleOpenModal = jest.fn();
      const handleAddToFavorites = jest.fn();
      const handleAddToCart = jest.fn();
      const handleRemoveFromCart = jest.fn();
      const setActiveDragProduct = jest.fn();
      const over = { id: "dnd-cart" };
      const active = { id: "drag-1" };

      handleDragEnd({
        over,
        active,
        activeDragProduct,
        handleOpenModal,
        handleAddToFavorites,
        handleAddToCart,
        handleRemoveFromCart,
        setActiveDragProduct,
      });

      expect(handleOpenModal).not.toHaveBeenCalled();
      expect(handleAddToFavorites).not.toHaveBeenCalled();
      expect(handleAddToCart).toHaveBeenCalledWith(activeDragProduct);
      expect(handleRemoveFromCart).not.toHaveBeenCalled();
      expect(setActiveDragProduct).toHaveBeenCalledWith(null);
    });

    it("should not handle any action when over and active are falsy", () => {
      const activeDragProduct = { ...defaultProduct, id: 1, title: "Product 1" };
      const handleOpenModal = jest.fn();
      const handleAddToFavorites = jest.fn();
      const handleAddToCart = jest.fn();
      const handleRemoveFromCart = jest.fn();
      const setActiveDragProduct = jest.fn();
      const over = null;
      const active = null;

      handleDragEnd({
        over,
        active,
        activeDragProduct,
        handleOpenModal,
        handleAddToFavorites,
        handleAddToCart,
        handleRemoveFromCart,
        setActiveDragProduct,
      });

      expect(handleOpenModal).not.toHaveBeenCalled();
      expect(handleAddToFavorites).not.toHaveBeenCalled();
      expect(handleAddToCart).not.toHaveBeenCalled();
      expect(handleRemoveFromCart).not.toHaveBeenCalled();
      expect(setActiveDragProduct).not.toHaveBeenCalled();
    });
  });

  describe("handleSearch", () => {
    it("should set search value and set all products when value is empty", () => {
      const value = "";
      const allProducts = [{ ...defaultProduct, id: 1, title: "Product 1" }];
      const setSearch = jest.fn();
      const setProducts = jest.fn();

      handleSearch({ value, allProducts, setSearch, setProducts });

      expect(setSearch).toHaveBeenCalledWith(value);
      expect(setProducts).toHaveBeenCalledWith(allProducts);
    });

    it("should set search value and set filtered products when value is not empty", () => {
      const value = "product";
      const allProducts: Product[] = [
        { ...defaultProduct, id: 1, title: "Product 1" },
        { ...defaultProduct, id: 2, title: "Test 2" },
      ];
      const setSearch = jest.fn();
      const setProducts = jest.fn();

      handleSearch({ value, allProducts, setSearch, setProducts });

      expect(setSearch).toHaveBeenCalledWith(value);
      expect(setProducts).toHaveBeenCalledWith([allProducts[0]]);
    });
  });
});
