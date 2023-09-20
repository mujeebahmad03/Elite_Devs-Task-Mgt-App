import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

  html{
    font-size: 10px;
  }

  body {
    background: #333333;
    color: white;
    font-family: 'Poppins', sans-serif;
    width: 100%;
    min-height: 100vh;
  }
`

export default GlobalStyles