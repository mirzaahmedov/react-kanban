import { DragEvent, useEffect, useRef } from "react"
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
  const elem = useRef<HTMLDivElement | null>(null)
  
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement

    elem.current = target.cloneNode(false) as HTMLDivElement
    document.body.appendChild(elem.current)

    target.style.opacity = '0'

    e.dataTransfer.setData('text/plain', props.task.id)
  }
  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    
    document.body.removeChild(elem.current!)
    elem.current = null
  
    target.style.opacity = '1'
  }

  useEffect(() => {
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()

      const target = elem.current

      if (target) {
        target.style.position = 'absolute'
        target.style.left = `0px`
        target.style.right = `0px`
        target.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    // @ts-ignore
    window.addEventListener('dragover', handleDragOver)

    return () => {
      // @ts-ignore
      window.removeEventListener('dragover', handleDragOver)
    }
  }, [])

  return (
    <Container 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
      draggable
    >
      <Title as="h6" variant="base-bold">{props.task.title}</Title>
      <Description variant="small-normal" color="secondary">{props.task.description}</Description>
      <Button><Delete /> Delete</Button>
    </Container>
  )
}

export default Card
