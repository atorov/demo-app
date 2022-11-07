import * as React from 'react'
import buildContext from '../../shared/build-ls-persisted-context'

declare const APP_NAME: string

export type AuthState = {
    status: 'not_authenticated' | 'authenticated'
    data?: Partial<{
        accessToken: string
        name: string
        role: string
        userId: string
    }>
}

const INITIAL_STORE_DATA: AuthState = {
    status: 'not_authenticated',
}

const { Provider: AuthProvider, useContext } = buildContext({
    displayName: 'AuthContext',
    initialData: INITIAL_STORE_DATA,
    storageKey: `${APP_NAME}-auth`,
})

export { AuthProvider }

export function useAuthContext(): [AuthState, React.Dispatch<React.SetStateAction<AuthState>>, {
    isAuth: boolean;
    logout: () => void;
}] {
    const [data, setData] = useContext()
    const isAuth = data.status === 'authenticated'

    const logout = React.useCallback(() => {
        setData({ status: 'not_authenticated' })
    }, [setData])
    return [data, setData, { isAuth, logout }]
}
