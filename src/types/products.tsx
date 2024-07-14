export interface Product {
  /* id of the product */
  id: number;
  /* title of the product */
  title: string;
  /* price of the product */
  price: number;
  /* description of the product */
  description: string;
  /* category of the product */
  category: string;
  /* image of the product */
  image: string;
  /* rating object of the product */
  rating: Rating;
}

export interface Rating {
  /* average rating of the product */
  rate: number;
  /* count of ratings */
  count: number;
}

export interface CartProductsList {
  /* id of the user owner of the cart */
  userId: number;
  /* list of ids in the cart */
  items: number[];
}
