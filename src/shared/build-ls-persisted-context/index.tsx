import * as React from 'react'
import type { ReactElement } from 'react'
import deepEqual from 'deep-equal'
import buildContext from '../build-context'

function loadPersistedData<Data>(storageKey: string, initData: Data) {
    let persistedData = initData
    try {
        const serializedData = sessionStorage.getItem(storageKey)
        if (serializedData) {
            persistedData = JSON.parse(serializedData)
        }
    }
    catch (reason) {
        const msg = '::: Load state error!'
        console.error('::: Error:', msg, reason)
    }
    return persistedData
}

function getPersistedData<Data>(storageKey: string, initData: Data) {
    const persistedData = loadPersistedData(storageKey, initData)
    return { ...initData, ...persistedData }
}

function saveData<Data>(storageKey: string, data: Data) {
    try {
        const serializedData = JSON.stringify(data)
        sessionStorage.setItem(storageKey, serializedData)
    }
    catch (reason) {
        const msg = '::: Save state error!'
        console.error('::: Error:', msg, reason)
    }
}

type ProviderInnerWrapperProps<Data> = {
    children: ReactElement
    initialData: Data
    storageKey: string
    useContext: () => [Data, React.Dispatch<React.SetStateAction<Data>>]
}

const ProviderInnerWrapper = <Data, >({
    children,
    initialData,
    storageKey,
    useContext,
}: ProviderInnerWrapperProps<Data>) => {
    const prevDataRef = React.useRef(initialData)
    const [data] = useContext()
    React.useEffect(() => {
        if (!deepEqual(prevDataRef.current, data, { strict: true })) {
            prevDataRef.current = data
            saveData(storageKey, data)
        }
    }, [data, storageKey])
    return children
}

function buildLsPersistedContext<Data>({
    displayName,
    initialData,
    storageKey,
}: {
    displayName: string
    initialData: Data
    storageKey: string
}) {
    const persistedData = getPersistedData(storageKey, initialData)
    const { Provider, useContext } = buildContext({ displayName, initialData: persistedData })
    const CustomizedProvider = ({ children }: { children: ReactElement }) => (
        <Provider>
            <ProviderInnerWrapper
                initialData={persistedData}
                storageKey={storageKey}
                useContext={useContext}
            >
                {children}
            </ProviderInnerWrapper>
        </Provider>
    )
    return {
        Provider: CustomizedProvider,
        useContext,
    }
}

export default buildLsPersistedContext
