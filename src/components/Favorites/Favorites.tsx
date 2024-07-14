import { DragOverlay, ItemEmptySlot, ItemImage, ItemsContainer, Title, Wrapper } from "./Favorites.style";
import Draggable from "@common/Draggable/Draggable";
import { Product } from "@/types/products";
import Droppable from "@common/Droppable/Droppable";
import Scrollable from "@common/Scrollable/Scrollable";

interface FavoritesProps {
  favorites: Product[];
  dragItem?: Product | null;
}

const Favorites = ({ favorites, dragItem }: FavoritesProps) => {
  const maxEmptySlots: number = Math.max(3, favorites.length);
  const showDragOverlay: boolean = !!dragItem && favorites.find((fav: Product) => fav.id === dragItem.id) === undefined;

  return (
    <Wrapper data-testid="fav-section">
      <Droppable id="dnd-favorites">
        <Title>{"Drag and drop to add your favourites"}</Title>
        {showDragOverlay && <DragOverlay />}

        <Scrollable>
          <ItemsContainer>
            {[...Array(maxEmptySlots)].map((_, index) => {
              if (index < favorites.length) {
                return (
                  <Draggable id={`favorite-${favorites[index].id}`} key={`fav-item-${index}`}>
                    <ItemImage
                      src={favorites[index].image}
                      alt={favorites[index].title}
                      width={105}
                      height={105}
                      data-testid={`fav-item-${index}`}
                    />
                  </Draggable>
                );
              }

              return <ItemEmptySlot key={`fav-empty-${index}`} data-testid={`fav-empty-${index}`} />;
            })}
            {favorites.length >= maxEmptySlots && (
              <ItemEmptySlot data-testid={`fav-empty-extra`}>Drag more items here!</ItemEmptySlot>
            )}
          </ItemsContainer>
        </Scrollable>
      </Droppable>
    </Wrapper>
  );
};

export default Favorites;
