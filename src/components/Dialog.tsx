import { ReactNode } from 'react';
import styled from 'styled-components';

import Typography from '@/components/Typography';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  box-shadow: 0 10px 20px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: #fff;
`;
const Header = styled.h5`
  padding: 16px;
`;

type Props = {
  children: ReactNode;
  title: string
}
const Dialog = ({ children, title }: Props) => {
  return (
    <Container onClick={e => e.stopPropagation()}>
      <Header>
        <Typography uppercase as="h5" variant="small-bold" color="primary">{title}</Typography>
      </Header>
      {children}
    </Container>
  );
};

export default Dialog;
