import 'styled-components'

interface Palette {
    background: {
        accent: string
        disabled: string
        hover: string
    }
    border: {
        accent: string
        primary: string
    }
    text: {
        accent: string
        disabled: string
        error: string
        primary: string
    }
}

declare module 'styled-components' {
    export interface DefaultTheme {
        border: {
            radius: string
        }
        font: {
            family: string
        }
        palette: Palette
    }
}
