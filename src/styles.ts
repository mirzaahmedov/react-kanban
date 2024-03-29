import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *::before,
  *::after,
  * {
    box-sizing: border-box;
  }
  * {
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 16px;
    font-family: "Roboto", sans-serif;
  }
`

export default GlobalStyle;
