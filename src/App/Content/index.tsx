import { BrowserRouter } from 'react-router-dom'
import { useAuthContext } from '../auth-context'
import AppRoutes from './AppRoutes'
import SideBar from './SideBar'
import TopBarL1 from './TopBarL1'

const Content = () => {
    const [, , { isAuth }] = useAuthContext()

    return (
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
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: '100vh',
                        overflow: 'hidden',
                    }}
                >
                    {isAuth ? <SideBar /> : null}
                    <AppRoutes />
                </div>
            </BrowserRouter>
        </main>
    )
}

export default Content
