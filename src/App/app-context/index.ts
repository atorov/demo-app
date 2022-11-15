import buildContext from '../../shared/build-context'

declare const BUILD_ENV: string

const INITIAL_DATA = {
    api: {
        baseUrl: BUILD_ENV === 'local' ? '/api/v1' : 'https://demo-app-api-production.up.railway.app/api/v1',
    },
}

export const { Provider: AppProvider, useContext: useAppContext } = buildContext({
    displayName: 'AppContext',
    initialData: INITIAL_DATA,
})
