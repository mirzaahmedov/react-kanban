import { ReactNode, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`
const ToggleButton = styled.div`
  appearance: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
`
const MenuItems = styled.div`
  position: absolute;
  width: 200px;
  top: 100%;
  left: 0;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 10px 20px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const MenuItem = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #718096;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`

type TMenuItem = {
  icon?: ReactNode;
  label: ReactNode;
  onClick: () => void;
}
type Props = {
  children: ReactNode;
  items: TMenuItem[];
}
const Menu = ({ children, items }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <ToggleButton onClick={() => setIsOpen(state => !state)}>{children}</ToggleButton>
      {
        isOpen ? (
          <MenuItems>
            {items.map((item, index) => (
              <MenuItem key={index} onClick={item.onClick}>
                {item.icon}{item.label}
              </MenuItem>
            ))}
          </MenuItems>
        ) : null
      }
    </Container>
  );
};

export default Menu;
