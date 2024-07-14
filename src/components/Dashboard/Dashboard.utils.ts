import { Product } from "@/types/products";
import { User } from "@/types/user";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

export interface DashboardProps {
  showAlert: (alert: { message: string; type: string }) => void;
  loadingContent: boolean;
  fetchedProducts: {
    allProducts: Product[];
    products: Product[];
    cartItems: Product[];
    favList: Product[];
    setProducts: (products: Product[]) => void;
    setCartItems: (items: Product[]) => void;
    setFavList: (items: Product[]) => void;
    loadingContent: boolean;
  };
  auth: {
    userIsAuthenticated: boolean;
    currentUser: User | null;
  };
}

export interface DragStartHandlerProps extends DragStartEvent {
  allProducts: Product[];
  setActiveDragProduct: (product: Product) => void;
}

export interface DragEndHandlerProps extends DragEndEvent {
  activeDragProduct: Product | null;
  handleOpenModal: (open: boolean) => void;
  handleAddToFavorites: (product: Product) => void;
  handleAddToCart: (product: Product) => void;
  handleRemoveFromCart: (product: Product) => void;
  setActiveDragProduct: (product: Product | null) => void;
}

export interface SearchHandlerProps {
  value: string;
  allProducts: Product[];
  setSearch: (search: string) => void;
  setProducts: (products: Product[]) => void;
}

export interface AddToCartHandlerProps extends DashboardProps {
  cartItems: Product[];
  newProduct: Product;
  dispatch: (action: unknown) => void;
  setCartItems: (items: Product[]) => void;
}

/**
 * Handles the drag start event for a product.
 */
export const handleDragStart = ({ allProducts, setActiveDragProduct, active }: DragStartHandlerProps) => {
  if (!active) {
    return;
  }
  const activeId = active?.id.toString();
  const product = allProducts.find((product: Product) => product.id === parseInt(activeId.split("-")[1]));

  if (!product) {
    return;
  }

  setActiveDragProduct(product);
};

/**
 * Handles the drag end event for the dashboard.
 */
export const handleDragEnd = ({
  over,
  active,
  activeDragProduct,
  handleOpenModal,
  handleAddToFavorites,
  handleAddToCart,
  handleRemoveFromCart,
  setActiveDragProduct,
}: DragEndHandlerProps) => {
  if (!over && !active) {
    return;
  }

  const activeId = active?.id.toString();
  if (activeDragProduct && !over && activeId.includes("favorite")) {
    handleOpenModal(true);
    return;
  }

  if (activeDragProduct && !over && activeId.includes("cart")) {
    handleRemoveFromCart(activeDragProduct);
  }

  const dropZone = over?.id;
  if (activeDragProduct && dropZone === "dnd-favorites" && !activeId.includes("favorite")) {
    handleAddToFavorites(activeDragProduct);
  }

  if (activeDragProduct && dropZone === "dnd-cart"  && !activeId.includes("cart")) {
    handleAddToCart(activeDragProduct);
  }

  setActiveDragProduct(null);
};

/**
 * Handles the search functionality by filtering products based on the search query.
 * If the search query is empty, all products are shown.
 */
export const handleSearch = ({ value, allProducts, setSearch, setProducts }: SearchHandlerProps) => {
  setSearch(value);

  if (value === "" || !value) {
    setProducts(allProducts);
    return;
  }

  const filteredProducts = allProducts.filter((product: Product) => {
    return product.title.toLowerCase().includes(value.toLowerCase());
  });

  setProducts(filteredProducts);
};
