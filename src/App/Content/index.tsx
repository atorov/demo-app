import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import TopBarL1 from './TopBarL1'

const Content = () => (
    <main
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
        }}
    >
        <BrowserRouter>
            <TopBarL1 />
            <AppRoutes />
        </BrowserRouter>
    </main>
)

export default Content
