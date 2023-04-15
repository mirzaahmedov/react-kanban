import styled,{css} from 'styled-components';

type Props = {
  primary?: boolean
}
const Button = styled.button<Props>`
  height: 2em;
  min-width: 2em;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  cursor: pointer;
  color: #333;
  font: inherit;

  &:hover {
    background-color: #f5f5f5;
  }

  & > svg {
    vertical-align: middle;
  }

  ${({ primary }) => primary && css`
    background-color: #0070f3;
    border-color: #0070f3;
    color: #fff;

    &:hover {
      background-color: #0060d2;
      border-color: #0060d2;
    }
  `}
`

export default Button;
