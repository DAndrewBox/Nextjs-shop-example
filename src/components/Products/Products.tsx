import { Product } from "@/types/products";
import { Content, NotFoundMessage, ProductContainer, ProductImage, ProductName, Wrapper } from "./Products.styles";
import Button from "@common/Button/Button";
import Draggable from "@common/Draggable/Draggable";
import Scrollable from "@common/Scrollable/Scrollable";

interface ProductsProps {
  products: Product[];
  searchQuery: string;
  onAddToCart: (product: Product) => void;
  onAddToFavorite: (product: Product) => void;
}

const Products = ({ products, searchQuery = "", onAddToCart }: ProductsProps) => {
  const productsToShow: Product[] = products.sort((a: Product, b: Product) => (a.title > b.title ? 1 : -1));

  const trimProductName = (name: string) => {
    const maxChars = 25;
    if (name.length > maxChars) {
      return `${name.slice(0, maxChars).trimEnd()}...`;
    }

    return name;
  };

  return (
    <Wrapper data-testid="products-section">
      <Scrollable>
        <Content data-testid="products-content">
          {productsToShow.length === 0 && searchQuery !== "" && (
            <NotFoundMessage>{`No products found with name "${searchQuery}"`}</NotFoundMessage>
          )}

          {productsToShow.length > 0 &&
            productsToShow.map((product: Product, index: number) => (
              <ProductContainer key={product.id} data-testid={`products-${index}`}>
                <Draggable id={`product-${product.id}`}>
                  <ProductImage src={product.image} alt={product.title} width={105} height={105} />
                </Draggable>
                <ProductName data-testid={`products-name-${index}`}>{trimProductName(product.title)}</ProductName>
                <Button
                  label="Add to Cart"
                  onClick={() => onAddToCart(product)}
                  size="small"
                  dataTestId={`btn-product-${product.id}`}
                />
              </ProductContainer>
            ))}
        </Content>
      </Scrollable>
    </Wrapper>
  );
};

export default Products;
