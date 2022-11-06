import {
    assign,
    createMachine,
} from 'xstate'
import { useMachine } from '@xstate/react'
import type { ResDataItem } from '../../../../api/controllers/data/{{get}}'
import { useAuthContext } from '../../../auth-context'

export type DataMachineContext = {
    data?: ResDataItem[]
}

// type DataMachineEvent = {}

const dataMachine = createMachine({
    id: 'data',
    predictableActionArguments: true,
    tsTypes: {} as import('./index.typegen').Typegen0,
    schema: {
        context: {} as DataMachineContext,
        // events: {} as DataMachineEvent,
    },
    context: {},
    initial: 'pre_loading',
    states: {
        pre_loading: {
            after: {
                0: { target: 'loading' },
            },
        },
        loading: {
            invoke: {
                src: 'load',
                onDone: {
                    target: 'done',
                    actions: assign({
                        data: (_: DataMachineContext, event) => event.data,
                    }),
                },
                onError: {
                    target: 'error',
                },
            },
        },
        error: {
            type: 'final',
            entry: 'onErrorEntry',
        },
        done: {
            type: 'final',
        },
    },
})

const Dashboard = () => {
    const [authData, , { logout }] = useAuthContext()

    const [dataMachineState] = useMachine(dataMachine, {
        actions: {
            onErrorEntry: logout,
        },
        services: {
            load: async () => {
                const url = 'https://demo-app-production.up.railway.app/api/v1/data'
                const res: any = await fetch(
                    url,
                    {
                        headers: {
                            Authorization: String(authData.data?.accessToken),
                        },
                    },
                )
                if (res.status !== 200) {
                    throw new Error(`Status code: ${res.status}!`)
                }
                return res.json()
            },
        },
    })

    return (
        <div style={{ overflow: 'auto' }}>
            Dashboard
            <pre>
                {JSON.stringify(dataMachineState.context.data, null, 2)}
            </pre>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}

export default Dashboard
