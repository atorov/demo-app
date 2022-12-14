import {
    NavLink,
    useNavigate,
    useMatch,
} from 'react-router-dom'
import styled from 'styled-components'
import StyledButton from '../../../shared/components/styled/Button'

const CustomStyledSideBar = styled.header`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    width: 8rem;
    padding: 0.5rem;
    border-right: ${(props) => `1px solid ${props.theme.palette.border.primary}`};
`

const CustomStyledButton = styled(StyledButton)`
    width: 100%;
    display: block;
    margin-bottom: 0.5rem;
    text-align: center;
`

const CustomStyledNavLink = styled(NavLink)`
    display: block;
    width: 100%;
    height: 2rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    background-color: ${(props) => props.theme.palette.background.accent};
    color: ${(props) => props.theme.palette.text.accent};
    text-align: center;
    text-decoration: none;
    cursor: pointer;

    &.active {
        background-color: ${(props) => props.theme.palette.background.disabled};
        color: ${(props) => props.theme.palette.text.disabled};
        cursor: not-allowed;
    }
`

const SideBar = () => {
    const rootMatch = useMatch('/')
    const dashboardMatch = useMatch('/dashboard')
    const navigate = useNavigate()

    return (
        <CustomStyledSideBar>
            <CustomStyledButton
                disabled={Boolean(rootMatch || dashboardMatch)}
                onClick={() => {
                    navigate('/dashboard')
                }}
            >
                Dashboard
            </CustomStyledButton>
            <CustomStyledNavLink to="/bitstamp-data">
                BitStamp
            </CustomStyledNavLink>
            <CustomStyledNavLink to="/chat/room">
                Chat
            </CustomStyledNavLink>
            <CustomStyledNavLink to="/tasks">
                Tasks
            </CustomStyledNavLink>
            <CustomStyledNavLink to="/paginated-data">
                Paginated
            </CustomStyledNavLink>
            <CustomStyledNavLink to="/infinite-queries">
                Infinite
            </CustomStyledNavLink>
        </CustomStyledSideBar>
    )
}

export default SideBar
