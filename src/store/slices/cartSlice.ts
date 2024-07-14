import { CartProduct } from "@/types/products";
import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  carts: CartProduct[];
}

const initialState: CartState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { userId, productId } = action.payload;
      const userCart = state.carts.find((cart: CartProduct) => cart.userId === userId);

      if (userCart) {
        userCart.items.push(productId);
      } else {
        state.carts.push({ userId, items: [productId] });
      }
    },
    removeFromCart(state, action) {
      const { userId, productId } = action.payload;
      const userCart = state.carts.findIndex((cart: CartProduct) => cart.userId === userId);

      if (userCart !== -1) {
        state.carts[userCart].items = state.carts[userCart].items.filter((itemId: number) => itemId !== productId);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
