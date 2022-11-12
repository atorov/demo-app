import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html,
    body,
    #app-root {
        position: inherit !important;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        border: none;
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
    }
`

export default GlobalStyle