import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";

import Dialog from "@/components/Dialog";
import TextField from "@/components/TextField";
import Button from "@/components/Button";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`

type Props = {
  onClose: () => void;
}
const CreateColDialog = ({ onClose }: Props) => {
  const queryClient = useQueryClient();

  const addNewCol = useMutation(
    async (label: string) => {
      const { data } = await axios.post('http://localhost:3000/cols', {
        id: Date.now().toString(),
        label,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    },{
      onSuccess: () => {
        queryClient.invalidateQueries(['cols'])
      }
    }
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addNewCol.mutate((e.currentTarget[0] as HTMLInputElement).value);

    onClose();
  }

  return (
    <Dialog title="Create Column">
      <Form onSubmit={handleSubmit}>
        <TextField label="Title" name="name" type="text" />
        <Button primary type="submit">Create</Button>
        <Button type="reset" onClick={onClose}>Cancel</Button>
      </Form>
    </Dialog>
  )
};

export default CreateColDialog;
