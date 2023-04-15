import { DragEvent, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from "axios"
import styled from "styled-components"

import { Task } from '@/features/task/types'
import { More, Delete, Create } from "@/assets/icons/ui"
import CreateTaskDialog from '@/features/task/components/CreateTaskDialog'
import CraeteColDialog from '@/features/task/components/CreateColDialog'
import Card from '@/features/task/components/Card'
import Menu from "@/components/Menu"
import Button from "@/components/Button"
import Typography from '@/components/Typography'

type Col = {
  id: string
  label: string
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const Columns = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
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

  &.dragover {
    background-color: #f5f5f5;
  }
`
const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

const Board = () => {
  const [currentCol, setCurrentCol] = useState<null | string>(null)

  const [isCreateColDialogOpen, setIsCreateColDialogOpen] = useState(false)
  const [isCreateTaskDialogOpen, setIsCreateTaskDialogOpen] = useState(false)
  
  const queryClient = useQueryClient()

  const { data: cols } = useQuery({
    queryKey: ['cols'],
    queryFn: async () => { 
      const { data } = await axios.get<Col[]>('http://localhost:3000/cols', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    }
  })
  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => { 
      const { data } = await axios.get<Task[]>('http://localhost:3000/tasks', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    }
  })

  const deleleColumn = useMutation(async (id: string) => {
    const { data } = await axios.delete(`http://localhost:3000/cols/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return data
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cols'])
    }
  })
  
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.add("dragover")
  }
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    return false
  }
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("dragover")
  }
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const id = e.dataTransfer.getData("text/plain")
    const col = e.currentTarget.id
    const newTask = {
      col
    }
    axios.patch(`http://localhost:3000/tasks/${id}`, newTask, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      queryClient.invalidateQueries(['tasks'])
    })
  }

  return (
    <Container>
      <Columns>
        {Array.isArray(cols) && cols.length > 0 ? cols?.map((col) => (
          <Column key={col.id} id={col.id} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
            <ColumnHeader>
              <Typography uppercase variant="small-bold" color="primary">{col.label}</Typography>
              <Menu items={[
                {
                  icon: <Delete />,
                  label: "Delete",
                  onClick: () => deleleColumn.mutate(col.id),
                }
              ]}>
                <Button><More /></Button>
              </Menu>
            </ColumnHeader>
            {Array.isArray(tasks) && tasks.length > 0 ? tasks?.filter((task) => task.col === col.id).map((task) => (
              <Card key={task.id} task={task} />
            )) : null}
            <Button style={{ marginTop: 8, width: "100%" }} onClick={() => {setIsCreateTaskDialogOpen(true); setCurrentCol(col.id)}}><Create /> Add task</Button>
          </Column>
        )) : null}
        <Button style={{ minWidth: 300 }} onClick={() => setIsCreateColDialogOpen(true)}><Create /> Add column</Button>
      </Columns>
      {isCreateColDialogOpen ? (
        <CraeteColDialog onClose={() => setIsCreateColDialogOpen(false)} />
      ) : null}
      {isCreateTaskDialogOpen && currentCol ? (
        <CreateTaskDialog col={currentCol} onClose={() => setIsCreateTaskDialogOpen(false)} />
      ) : null}
    </Container>
  )
}

export default Board
