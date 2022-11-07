import { Outlet } from 'react-router-dom'

const Layout = () => (
    <div
        style={{
            flex: 1,
            overflow: 'auto',
        }}
    >
        <h3>WebSocket chat room</h3>
        <Outlet />
    </div>
)

export default Layout
