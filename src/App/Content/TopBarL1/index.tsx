import {
    Link,
    useNavigate,
    useMatch,
} from 'react-router-dom'
import { useAuthContext } from '../../auth-context'

const TopBarL1 = () => {
    console.log()
    const [, , { isAuth, logout }] = useAuthContext()

    const rootMatch = useMatch('/')
    const dashboardMatch = useMatch('/dashboard')
    const navigate = useNavigate()

    return (
        <header
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                height: '60px',
                minHeight: '60px',
                borderBottom: '1px solid lightgrey',
                overflow: 'hidden',
            }}
        >
            <div>
                <img
                    src="/img/logo.png"
                    alt="logo"
                    width="200px"
                />
            </div>
            <div style={{ flex: 1 }} />
            {isAuth ? (
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
                    <Link to="/page1">
                        Page 1
                    </Link>
                    <button
                        type="button"
                        onClick={logout}
                    >
                        LOGOUT
                    </button>
                </div>
            ) : null}
        </header>
    )
}

export default TopBarL1
