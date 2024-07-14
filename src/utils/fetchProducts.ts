import { useState, useEffect } from "react";
import axios from "axios";
import { Product, CartProductsList } from "@/types/products";
import { getReduxStore } from "@/store";

/**
 * Custom hook to fetch products based on user authentication status.
 * @returns An object containing the fetched products, cart items, favorite list, loading status, and setter functions.
 */
export const useFetchProducts = (userIsAuthenticated: boolean) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [favList, setFavList] = useState<Product[]>([]);
  const [loadingContent, setLoadingContent] = useState<boolean>(true);

  useEffect(() => {
    if (userIsAuthenticated) {
      const fetchProducts = async () => {
        await axios
          .get(`/api/products`)
          .then((response) => {
            const fetchedProducts = response.data;
            setAllProducts(fetchedProducts);
            setProducts(fetchedProducts);

            const store = getReduxStore();
            const { carts } = store.cart;
            const { list } = store.favorites;
            const { user } = store.auth;

            if (user !== null) {
              const userCart = carts.find((item: CartProductsList) => item.userId === user.id);
              if (userCart) {
                const cartItemsDetailed = userCart.items
                  .map((item: number) => fetchedProducts.find((product: Product) => product.id === item))
                  .filter((item: Product | undefined) => item !== undefined);

                setCartItems(cartItemsDetailed);
              }

              const userFavorites = list.find((item: CartProductsList) => item.userId === user.id);
              if (userFavorites) {
                const favItemsDetailed = userFavorites.items
                  .map((item: number) => fetchedProducts.find((product: Product) => product.id === item))
                  .filter((item: Product | undefined) => item !== undefined);

                setFavList(favItemsDetailed);
              }
            }
          })
          .finally(() => {
            setLoadingContent(false);
          });
      };

      fetchProducts();
    }
  }, [userIsAuthenticated]);

  return { allProducts, products, cartItems, favList, loadingContent, setProducts, setCartItems, setFavList };
};
