import * as React from 'react'
import type { ReactElement } from 'react'

function buildContext<Data, ChildrenProps>({
    displayName,
    initialData,
}: {
    displayName: string
    initialData: Data
}) {
    const defaultContextValue: [
        Data,
        React.Dispatch<React.SetStateAction<Data>>,
    ] = [initialData, () => initialData]
    const Context = React.createContext(defaultContextValue)
    Context.displayName = displayName

    const Provider = (props: { children: ReactElement } & ChildrenProps) => {
        const [data, setData] = React.useState<Data>(initialData)
        const value: typeof defaultContextValue = React.useMemo(() => [data, setData], [data])
        const { children, ...childrenProps } = props
        return (
            <Context.Provider value={value} {...childrenProps}>
                {children}
            </Context.Provider>
        )
    }

    function useContext() {
        const context = React.useContext(Context)
        if (context === undefined) {
            throw new Error('Must be used within a Provider')
        }
        return context
    }

    return { Provider, useContext }
}

export default buildContext
