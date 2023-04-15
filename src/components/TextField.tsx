import { InputHTMLAttributes, useId } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 0.875rem;
  color: #718096;
`
const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font: inherit;
  width: 100%;
`

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  textarea?: boolean
}
const TextField = ({ label, textarea, ...props }: Props) => {
  const id = useId();
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <Input {...props} name={id} id={id} as={textarea ? "textarea" : "input"} />
    </Container>
  )
}

export default TextField
