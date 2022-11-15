import { ThemeProvider } from 'styled-components'
import type { DefaultTheme } from 'styled-components'
import { AppProvider } from './app-context'
import { AuthProvider } from './auth-context'
import GlobalStyle from '../shared/components/styled/GlobalStyle'
import Content from './Content'
// import './style.scss'

const appLoaderElement = document.querySelector('.app-loader')
if (appLoaderElement) {
    appLoaderElement.parentNode?.removeChild(appLoaderElement)
}

const theme: DefaultTheme = {
    border: {
        radius: '0.25rem',
    },
    font: {
        family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    },
    palette: {
        background: {
            accent: 'darkgreen',
            disabled: 'grey',
            hover: 'green',
            primary: 'lightgrey',
        },
        border: {
            accent: 'green',
            primary: 'lightgrey',
        },
        text: {
            accent: 'yellowgreen',
            disabled: 'lightgrey',
            error: 'darkred',
            primary: 'grey',
        },
    },
}

const App = () => (
    <AppProvider>
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Content />
            </ThemeProvider>
        </AuthProvider>
    </AppProvider>
)

export default App
