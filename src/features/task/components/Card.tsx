import { DragEvent, useRef } from "react"
import styled from "styled-components"

import { Task } from "@/features/task/types"
import { Delete } from "@/assets/icons/ui"
import Typography from "@/components/Typography"

const Container = styled.div`
  margin-top: 8px;
  padding: 8px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08);
  cursor: move;
  width: 284px;
`
const Title = styled(Typography)`
  margin-bottom: 4px;
`
const Description = styled(Typography)`
  margin-bottom: 8px;
`
const Button = styled.button`
  appearance: none;
  border: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font: inherit;
  color: #666666;

  &:hover {
    color: #c40334;
  }
`

type Props = {
  task: Task
}
const Card = (props: Props) => {
  const clickOffsets = useRef<{ x: number, y: number }>({ x: 0, y: 0 })
  const clickElem = useRef<HTMLDivElement | null>(null)
  
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    clickOffsets.current = { 
      x: e.clientX - e.currentTarget.getBoundingClientRect().left,
      y: e.clientY - e.currentTarget.getBoundingClientRect().top
    }

    clickElem.current = e.currentTarget.cloneNode(true) as HTMLDivElement

    document.body.appendChild(clickElem.current)

    e.currentTarget.style.opacity = '0'
  }
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    if (clickElem.current) {
      clickElem.current.style.position = 'absolute'
      clickElem.current.style.left = '0px'
      clickElem.current.style.top = '0px'
      clickElem.current.style.transform = `translate(${e.clientX - clickOffsets.current.x}px, ${e.clientY - clickOffsets.current.y}px)`
    }
  }
  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1'

    if (clickElem.current) {
      document.body.removeChild(clickElem.current)
    }
  }

  return (
    <Container 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      draggable
    >
      <Title as="h6" variant="base-bold">{props.task.title}</Title>
      <Description variant="small-normal" color="secondary">{props.task.description}</Description>
      <Button><Delete /> Delete</Button>
    </Container>
  )
}

export default Card
