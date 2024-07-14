import Button from "@common/Button/Button";
import {
  CartItem,
  CartItemDetails,
  CartItemImage,
  CartItemsContainer,
  CartEmptySlot,
  CartItemTitle,
  CartRemoveButton,
  Title,
  Wrapper,
} from "./Cart.styles";
import { Product } from "@/types/products";
import Trash from "@icons/trash.svg";
import Scrollable from "@common/Scrollable/Scrollable";
import Droppable from "@common/Droppable/Droppable";
import Draggable from "@common/Draggable/Draggable";

interface CartProps {
  cartItems: Product[];
  onRemoveItem: (product: Product) => void;
  onBuyNow: () => void;
}

const Cart = ({ cartItems = [], onRemoveItem, onBuyNow }: CartProps) => {
  const maxEmptySlots: number = Math.max(3, cartItems.length);

  return (
    <Wrapper data-testid="cart-section">
      <Title>Cart</Title>
      <Droppable id="dnd-cart">
        <Scrollable>
          <CartItemsContainer data-testid="cart-items-container">
            {[...Array(maxEmptySlots)].map((_, index) => {
              if (index < cartItems.length) {
                return (
                  cartItems[index] && (
                    <CartItem key={`cart-item-${index}`} data-testid={`cart-item-${index}`}>
                      <Draggable id={`cart-${cartItems[index].id}`}>
                        <CartItemImage
                          src={cartItems[index].image}
                          alt={cartItems[index].title}
                          width={105}
                          height={105}
                        />
                      </Draggable>
                      <CartItemDetails>
                        <CartItemTitle>{cartItems[index].title}</CartItemTitle>
                        <CartRemoveButton
                          src={Trash}
                          alt="Remove item"
                          width={24}
                          height={24}
                          onClick={() => onRemoveItem(cartItems[index])}
                          data-testid={`cart-item-${index}-remove`}
                        />
                      </CartItemDetails>
                    </CartItem>
                  )
                );
              }
              return <CartEmptySlot key={index} data-testid={`cart-empty-${index}`} />;
            })}

            {cartItems.length >= maxEmptySlots && (
              <CartEmptySlot data-testid={`cart-item-extra`}>
                {"You can add items by dragging them here!"}
              </CartEmptySlot>
            )}
          </CartItemsContainer>
        </Scrollable>
      </Droppable>

      <Button label="Buy now" onClick={onBuyNow} size="large" disabled={cartItems.length === 0} />
    </Wrapper>
  );
};

export default Cart;
