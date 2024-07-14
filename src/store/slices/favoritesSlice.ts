import { FavoriteItems } from "@/types/favorites";
import { createSlice } from "@reduxjs/toolkit";

interface FavoriteState {
  list: FavoriteItems[];
}

const initialState: FavoriteState = {
  list: [],
};

const favSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action) {
      const { userId, productId } = action.payload;
      const userFavorites = state.list.find((item: FavoriteItems) => item.userId === userId);

      if (userFavorites) {
        userFavorites.items.push(productId);
      } else {
        state.list.push({ userId, items: [productId] });
      }
    },
    removeFromFavorites(state, action) {
      const userId = action.payload.userId;
      const productId = action.payload.productId;
      const userFavorites = state.list.findIndex((list: FavoriteItems) => list.userId === userId);

      if (userFavorites !== -1) {
        state.list[userFavorites].items = state.list[userFavorites].items.filter(
          (itemId: number) => itemId !== productId
        );
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favSlice.actions;
export default favSlice.reducer;
