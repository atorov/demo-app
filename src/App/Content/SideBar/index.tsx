import {
    NavLink,
    useNavigate,
    useMatch,
} from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../../shared/components/styled/Button'

const StyledButton = styled(Button).attrs((props) => props)`
    width: 100%;
    display: block;
    margin-bottom: 0.5rem;
    text-align: center;
`

const inactiveStyle = {
    textDecoration: 'none',
}

const SideBar = () => {
    console.log()
    const rootMatch = useMatch('/')
    const dashboardMatch = useMatch('/dashboard')
    const navigate = useNavigate()

    return (
        <aside
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'start',
                width: '8rem',
                padding: '0.5rem',
                borderRight: '1px solid lightgrey',
            }}
        >
            <StyledButton
                disabled={Boolean(rootMatch || dashboardMatch)}
                onClick={() => {
                    navigate('/dashboard')
                }}
            >
                Dashboard
            </StyledButton>
            <div>
                <NavLink
                    to="/bitstamp-data"
                    style={({ isActive }) => (!isActive ? inactiveStyle : undefined)}
                >
                    BitStamp Data
                </NavLink>
            </div>
            <div>
                <NavLink
                    to="/chat/room"
                    style={({ isActive }) => (!isActive ? inactiveStyle : undefined)}
                >
                    Chat
                </NavLink>
            </div>
            <div>
                <NavLink
                    to="/page1"
                    style={({ isActive }) => (!isActive ? inactiveStyle : undefined)}
                >
                    Page 1
                </NavLink>
            </div>
        </aside>
    )
}

export default SideBar
