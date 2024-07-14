export type AlertType = string | "success" | "error" | "warning";

export enum ALERT_MESSAGES {
  ERROR_GENERIC = "An error occurred. Please try again later.",
  AUTH_FAILED = "Cannot access the page without logging in. Please log in first.",
  INVALID_CREDENTIALS = "Invalid credentials. Please try again.",
  CART_ADD_SUCCESS = "Product successfully added to cart.",
  CART_REMOVE_SUCCESS = "Product successfully removed from cart.",
  CART_ITEM_ALREADY_EXISTS = "Product already exists in cart.",
  FAV_ADD_SUCCESS = "Product successfully added to favorites.",
  FAV_REMOVE_SUCCESS = "Product successfully removed from favorites.",
  FAV_ITEM_ALREADY_EXISTS = "Product already exists in favorites list.",
  LOGOUT_SUCCESS = "You have been successfully logged out.",
}

export enum ALERT_TYPE {
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "success",
}
