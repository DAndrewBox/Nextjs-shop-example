import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import favoritesReducer from "./slices/favoritesSlice";
import { persistStore, persistReducer, persistCombineReducers } from "redux-persist";
import localStorage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: localStorage,
};

const reducers = persistCombineReducers(persistConfig, {
  auth: persistReducer(
    {
      key: "auth",
      storage: localStorage,
    },
    authReducer
  ),
  cart: persistReducer(
    {
      key: "cart",
      storage: localStorage,
    },
    cartReducer
  ),
  favorites: persistReducer(
    {
      key: "favorites",
      storage: localStorage,
    },
    favoritesReducer
  ),
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

export const getReduxStore = () => store.getState();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
