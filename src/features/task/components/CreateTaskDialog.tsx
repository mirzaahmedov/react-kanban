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
  col: string
  onClose: () => void;
}
const CreateColDialog = ({ onClose, col }: Props) => {
  const queryClient = useQueryClient();

  const addNewCol = useMutation(
    async ({ title, description = "", attachment = null }: { title: string, description?: string, attachment?: File | null }) => {
      if (!title) {
        throw new Error("Label is required");
      }

      const base64File = attachment ? await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(attachment);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      }) : null;

      const { data } = await axios.post('http://localhost:3000/tasks', {
        id: Date.now().toString(),
        description,
        attachment: base64File,
        title,
        col,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    },{
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks'])
      }
    }
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addNewCol.mutate(
      {
        title: (e.currentTarget[0] as HTMLInputElement).value,
        description: (e.currentTarget[1] as HTMLInputElement).value,
        attachment: (e.currentTarget[2] as HTMLInputElement).files![0]
      }
    );

    onClose();
  }

  return (
    <Dialog title="Create Task">
      <Form onSubmit={handleSubmit}>
        <TextField label="Title" name="name" type="text" />
        <TextField textarea label="Description" name="description" type="text" />
        <TextField label="Attached image(Only .jpg image)" name="attached" type="file" accept="image/jpg, image/jpeg" />
        <Button primary type="submit">Create</Button>
        <Button type="reset" onClick={onClose}>Cancel</Button>
      </Form>
    </Dialog>
  )
};

export default CreateColDialog;
