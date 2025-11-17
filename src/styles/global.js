import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
  /* Reset básico */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  /* Corpo da aplicação */
  body {
    width: 100%;
    min-height: 100vh;
    background-color: #f5f5f5;
    color: #333;
  }

  /* Facilita ocupar o espaço total */
  #root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

export default Global;
