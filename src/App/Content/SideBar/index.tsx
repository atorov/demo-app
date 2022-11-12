import {
    NavLink,
    useNavigate,
    useMatch,
} from 'react-router-dom'

const inactiveStyle = {
    textDecoration: 'none',
}

const SideBar = () => {
    const rootMatch = useMatch('/')
    const dashboardMatch = useMatch('/dashboard')
    const navigate = useNavigate()

    return (
        <aside
            style={{
                width: '104px',
                borderRight: '1px solid lightgrey',
            }}
        >
            <div>
                <button
                    type="button"
                    disabled={Boolean(rootMatch || dashboardMatch)}
                    onClick={() => {
                        navigate('/dashboard')
                    }}
                >
                    Dashboard
                </button>
            </div>
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
