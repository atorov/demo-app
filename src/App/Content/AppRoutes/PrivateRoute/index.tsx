import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../../auth-context'

type TProps = {
    children: JSX.Element
}

const PrivateRoute = (props: TProps) => {
    const [, , { isAuth }] = useAuthContext()
    const location = useLocation()

    if (isAuth) {
        return props.children
    }

    return (
        <Navigate
            to="/login"
            state={{ from: location }}
        />
    )
}

export default PrivateRoute
