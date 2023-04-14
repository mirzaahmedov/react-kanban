export type Status = 'todo' | 'in-progress' | 'done';

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
  attachment?: string;
}
