import buildContext from '../../shared/build-context'

const INITIAL_STORE_DATA = {}

export const { Provider: AppProvider, useContext: useAppContext } = buildContext({
    displayName: 'AppContext',
    initialData: INITIAL_STORE_DATA,
})
