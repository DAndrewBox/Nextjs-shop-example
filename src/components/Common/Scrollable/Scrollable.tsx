import { Wrapper } from "./Scrollable.styles";

interface ScrollableProps {
  children: React.ReactNode;
}

const Scrollable = (props: ScrollableProps) => {
  const { children } = props;

  return <Wrapper>{children}</Wrapper>;
};

export default Scrollable;
