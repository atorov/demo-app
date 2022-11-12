import { ThemeProvider } from 'styled-components'
import { AppProvider } from './app-context'
import { AuthProvider } from './auth-context'
import Content from './Content'
import GlobalStyle from './GlobalStyle'
// import './style.scss'

const appLoaderElement = document.querySelector('.app-loader')
if (appLoaderElement) {
    appLoaderElement.parentNode?.removeChild(appLoaderElement)
}

// TODO: theme

const App = () => (
    <AppProvider>
        <AuthProvider>
            <ThemeProvider theme={{}}>
                <GlobalStyle />
                <Content />
            </ThemeProvider>
        </AuthProvider>
    </AppProvider>
)

export default App
