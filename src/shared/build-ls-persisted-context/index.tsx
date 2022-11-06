import * as React from 'react'
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
        console.error(msg, reason)
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
        console.error(msg, reason)
    }
}

type ProviderInnerWrapperProps<Data> = {
    children: React.ReactNode
    initialData: Data
    storageKey: string
    useContext: () => [Data, React.Dispatch<React.SetStateAction<Data>>]
}

const ProviderInnerWrapper = <Data, >(props: ProviderInnerWrapperProps<Data>) => {
    const prevDataRef = React.useRef(props.initialData)
    const [data] = props.useContext()
    React.useEffect(() => {
        if (!deepEqual(prevDataRef.current, data, { strict: true })) {
            prevDataRef.current = data
            saveData(props.storageKey, data)
        }
    }, [data, props.storageKey])
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{props.children}</>
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
    const CustomizedProvider = (props: { children: React.ReactNode }) => (
        <Provider>
            <ProviderInnerWrapper
                initialData={persistedData}
                storageKey={storageKey}
                useContext={useContext}
            >
                {props.children}
            </ProviderInnerWrapper>
        </Provider>
    )
    return {
        Provider: CustomizedProvider,
        useContext,
    }
}

export default buildLsPersistedContext
