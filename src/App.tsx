import styled from 'styled-components';

import GlobalStyle from '@/styles';
import TaskBoard from '@/features/task/components/Board';

const Container = styled.div`
  background-color: #f5f5f5;
  height: 100vh;
`
const App = () => {
  return (
    <Container>
      <GlobalStyle />
      <TaskBoard />
    </Container>
  )
}

export default App;
