import { useState } from 'react'
import styled from "styled-components"

import { Task } from '@/features/task/types'
import Card from '@/features/task/components/Card'
import Typography from '@/components/Typography'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const Columns = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
  padding: 8px;
  overflow-x: auto;
`
const Column = styled.div`
  width: 300px;
  height: 100%;
  padding: 8px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`

const Board = () => {
  const [doneTasks, setDoneTasks] = useState<Task[] | null>([{ id: "1", title: 'title', description: 'description', status: "done" }])
  const [inProgressTasks, setInProgressTasks] = useState<Task[] | null>([{ id: "1", title: 'title', description: 'description', status: "in-progress" }])
  const [todoTasks, setTodoTasks] = useState<Task[] | null>([{ id: "1", title: 'title', description: 'description', status: "todo" }])

  return (
    <Container>
      <Columns>
        <Column>
          <Typography as="h6" color="primary" variant="medium-bold">TODO</Typography>
          {todoTasks?.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </Column>
        <Column>
          <Typography as="h6" color="primary" variant="medium-bold">IN PROGRESS</Typography>
          {inProgressTasks?.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </Column>
        <Column>
          <Typography as="h6" color="primary" variant="medium-bold">DONE</Typography>
          {doneTasks?.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </Column>
      </Columns>
    </Container>
  )
}

export default Board
