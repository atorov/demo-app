import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import StyledContainer from '../../../../../shared/components/styled/Container'
import StyledHeader from '../../../../../shared/components/styled/Header'

const Layout = () => {
    const CustomStyledContainer = styled(StyledContainer)`
        padding: 1rem;
    `
    return (
        <CustomStyledContainer>
            <StyledHeader>
                WebSocket Chat Room
            </StyledHeader>
            <Outlet />
        </CustomStyledContainer>
    )
}

export default Layout
