import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import styled from 'styled-components'
import { useAuthContext } from '../auth-context'
import AppRoutes from './AppRoutes'
import SideBar from './SideBar'
import TopBar from './TopBar'

const CustomStyledMainContent = styled.main`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    height: 100vh;
    overflow: hidden;
`

const CustomStyledInnerContent = styled.main`
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
`

const Content = () => {
    const [, , { isAuth }] = useAuthContext()

    return (
        <CustomStyledMainContent>
            <BrowserRouter>
                <TopBar />
                <CustomStyledInnerContent>
                    {isAuth ? <SideBar /> : null}
                    <AppRoutes />
                </CustomStyledInnerContent>
                <ReactQueryDevtools
                    initialIsOpen={false}
                    position="bottom-right"
                />
            </BrowserRouter>
        </CustomStyledMainContent>
    )
}

export default Content
