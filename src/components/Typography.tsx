import styled,{ css } from "styled-components"

type Size = "small" | "base" | "medium" | "large"
type Weight = "normal" | "bold"
type Color = "primary" | "secondary" | "tertiary" | "white" | "black"

type Variant = `${Size}-${Weight}`

type Props = {
  variant?: Variant
  color?: Color
  uppercase?: boolean
}


const scales: Record<Size,number> = {
  small: 0.8,
  base: 1,
  medium: 1.25,
  large: 1.563,
}
const colors: Record<Color, string> = {
  primary: "#0070f3",
  secondary: "#1a202c",
  tertiary: "#718096",
  white: "#fff",
  black: "#000",
}
const Typography = styled.p<Props>`
  & > svg {
    vertical-align: middle;
  }
  
  ${({ variant = "base-normal", color = "black", uppercase = false }) => {
    const [size, weight] = variant.split("-") as [Size, Weight]

    return css`
      font-size: ${scales[size]}rem;
      font-weight: ${weight === "bold" ? 700 : 400};
      color: ${colors[color]};
      text-transform: ${uppercase ? "uppercase" : "none"};
    `
  }}
`

export default Typography
