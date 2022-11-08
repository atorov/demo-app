import { useAuthContext } from '../../auth-context'

const TopBar = () => {
    const [authData, , { isAuth, logout }] = useAuthContext()

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
                    <span>
                        {authData.data?.name}
                    </span>
                    &nbsp;|&nbsp;
                    <span>
                        {authData.data?.role}
                    </span>
                    &nbsp;|&nbsp;
                    <span>
                        {authData.data?.userId}
                    </span>
                    &nbsp;|&nbsp;
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

export default TopBar