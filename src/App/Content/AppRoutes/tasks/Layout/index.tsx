import { Outlet } from 'react-router-dom'
import StyledContainer from '../../../../../shared/components/styled/Container'
import StyledHeader from '../../../../../shared/components/styled/Header'

const Layout = () => (
    <StyledContainer>
        <StyledHeader>
            Tasks
        </StyledHeader>
        <br />
        <Outlet />
    </StyledContainer>
)

export default Layout
