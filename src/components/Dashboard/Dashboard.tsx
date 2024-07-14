import { useState } from "react";
import Input from "@common/Input/Input";
import { getReduxStore } from "@/store";
import { useRouter } from "next/router";
import { MainContainer, Subtitle, Title, Wrapper } from "./Dashboard.styles";
import { Product } from "@/types/products";
import Products from "../Products/Products";
import Cart from "../Cart/Cart";
import { addToCart, removeFromCart } from "@store/slices/cartSlice";
import { useDispatch } from "react-redux";
import Favorites from "../Favorites/Favorites";
import { addToFavorites, removeFromFavorites } from "@store/slices/favoritesSlice";
import { FavoriteItems } from "@/types/favorites";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { ProductImage } from "../Products/Products.styles";
import { ALERT_MESSAGES, ALERT_TYPE } from "@/types/alert";
import { logout } from "@store/slices/authSlice";
import Modal from "@common/Modal/Modal";
import Button from "@common/Button/Button";
import {
  DashboardProps,
  DragEndHandlerProps,
  DragStartHandlerProps,
  handleDragEnd,
  handleDragStart,
  handleSearch,
} from "./Dashboard.utils";

export const Dashboard = (props: DashboardProps) => {
  const { showAlert, loadingContent, fetchedProducts, auth } = props;
  const { currentUser } = auth;
  const { allProducts, products, cartItems, favList, setProducts, setCartItems, setFavList } = fetchedProducts;
  const [search, setSearch] = useState<string>("");
  const [activeDragProduct, setActiveDragProduct] = useState<Product | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch({ value: e.target.value, allProducts, setSearch, setProducts });
  };

  const onDragStart = (props: DragStartHandlerProps) => {
    handleDragStart({ ...props, allProducts, setActiveDragProduct });
  };

  const onDragEnd = (props: DragEndHandlerProps) => {
    handleDragEnd({
      ...props,
      activeDragProduct,
      handleRemoveFromCart,
      handleAddToFavorites,
      handleAddToCart,
      setActiveDragProduct,
      handleOpenModal: setOpenModal,
    });
  };

  const handleLogout = () => {
    // Logout user and redirect to login page
    dispatch(logout());
    router.push("/login");
    showAlert({
      message: ALERT_MESSAGES.LOGOUT_SUCCESS,
      type: ALERT_TYPE.SUCCESS,
    });
  };

  const handleAddToCart = (newProduct: Product) => {
    // Add product to cart if user clicks on "Add to Cart" button and product is not already in the cart
    const { user } = getReduxStore().auth;
    if (user === null) {
      return;
    }

    const userId = user.id;
    const productId = newProduct.id;

    if (!cartItems.find((item: Product) => item.id === productId)) {
      setCartItems([...cartItems, newProduct]);
      dispatch(addToCart({ userId, productId }));
      showAlert({
        message: ALERT_MESSAGES.CART_ADD_SUCCESS,
        type: ALERT_TYPE.SUCCESS,
      });
    } else {
      showAlert({
        message: ALERT_MESSAGES.CART_ITEM_ALREADY_EXISTS,
        type: ALERT_TYPE.WARNING,
      });
    }
  };

  const handleRemoveFromCart = (product: Product) => {
    // Remove product from cart if user clicks on "Remove" button
    const { user } = getReduxStore().auth;
    if (user === null) {
      return;
    }

    const userId = user.id;
    const productId = product.id;
    const newCart = [...cartItems].filter((item: Product) => item.id !== productId);

    setCartItems(newCart);
    dispatch(removeFromCart({ userId, productId }));

    showAlert({
      message: ALERT_MESSAGES.CART_REMOVE_SUCCESS,
      type: ALERT_TYPE.SUCCESS,
    });
  };

  const handleAddToFavorites = (newProduct: Product) => {
    // Add product to cart if user drags product into favorites is not already in the list
    const { user } = getReduxStore().auth;
    if (user === null) {
      return;
    }

    const { list } = getReduxStore().favorites;
    const userId = user.id;
    const productId = newProduct.id;

    if (
      !list.find(
        (favoriteList: FavoriteItems) => favoriteList.userId === userId && favoriteList.items.includes(productId)
      )
    ) {
      dispatch(addToFavorites({ userId, productId }));
      setFavList([...favList, newProduct]);
      showAlert({
        message: ALERT_MESSAGES.FAV_ADD_SUCCESS,
        type: ALERT_TYPE.SUCCESS,
      });
    } else {
      showAlert({
        message: ALERT_MESSAGES.FAV_ITEM_ALREADY_EXISTS,
        type: ALERT_TYPE.WARNING,
      });
    }
  };

  const handleRemoveFromFavorites = (product: Product | null) => {
    // Remove product from favorites if user drags product out of favorites
    const { user } = getReduxStore().auth;
    setActiveDragProduct(null);

    if (user === null || product === null) {
      return;
    }

    const userId: number = user.id;
    const productId: number = product.id;
    const newFavList: Product[] = [...favList].filter((item: Product) => item.id !== productId);

    setOpenModal(false);
    setFavList(newFavList);
    dispatch(removeFromFavorites({ userId, productId }));

    showAlert({
      message: ALERT_MESSAGES.FAV_REMOVE_SUCCESS,
      type: ALERT_TYPE.SUCCESS,
    });
  };

  const FavoritesRemoveModal = () => (
    <Modal
      open={openModal}
      title="Are you sure?"
      useCloseButton
      onClickOutside={() => setOpenModal(false)}
      onClose={() => setOpenModal(false)}
      content={
        <p>
          {`Are you sure you want to remove "`}
          <strong>{activeDragProduct?.title}</strong>
          {`" from your favorites? `}
          <strong>This action cannot be undone.</strong>
        </p>
      }
      actions={
        <>
          <Button label="Remove it!" size="large" onClick={() => handleRemoveFromFavorites(activeDragProduct)} />
          <Button label="I'm not sure..." size="large" onClick={() => setOpenModal(false)} />
        </>
      }
      dataTestId="modal-favorite-remove"
    ></Modal>
  );

  if (loadingContent) {
    return (
      <Wrapper>
        <MainContainer>
          <Title>Shop Example</Title>
          <Subtitle>Loading content...</Subtitle>
        </MainContainer>
      </Wrapper>
    );
  }

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <FavoritesRemoveModal />
      <Wrapper data-testid="dashboard-content">
        <MainContainer>
          <Title>Shop Example</Title>
          <Subtitle>
            {`Welcome again, ${currentUser?.name.firstname}. Are you not ${currentUser?.name.firstname}? `}
            <span onClick={handleLogout} data-testid="btn-logout">
              Disconnect by clicking here.
            </span>
          </Subtitle>
          <Input
            label="Filter"
            type="text"
            value={search}
            placeholder="Type here to search for products..."
            onChange={onSearch}
            dataTestId="input-search"
          />
          <Products
            products={products}
            searchQuery={search}
            onAddToCart={handleAddToCart}
            onAddToFavorite={handleAddToFavorites}
          />
        </MainContainer>

        <Favorites favorites={favList} dragItem={activeDragProduct} />
        <Cart cartItems={cartItems} onRemoveItem={handleRemoveFromCart} onBuyNow={() => {}} />
      </Wrapper>

      <DragOverlay
        zIndex={2}
        dropAnimation={null}
        style={{
          cursor: "grabbing",
        }}
      >
        {activeDragProduct ? (
          <ProductImage src={activeDragProduct.image} alt={activeDragProduct.title} width={105} height={105} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Dashboard;
