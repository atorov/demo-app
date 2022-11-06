import Content from './Content'
import { AppProvider } from './app-context'
import { AuthProvider } from './auth-context'
import './style.scss'

const appLoaderElement = document.querySelector('.app-loader')
if (appLoaderElement) {
    appLoaderElement.parentNode?.removeChild(appLoaderElement)
}

const App = () => (
    <AppProvider>
        <AuthProvider>
            <Content />
        </AuthProvider>
    </AppProvider>
)

export default App
