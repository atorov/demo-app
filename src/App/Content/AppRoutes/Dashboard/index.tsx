import {
    assign,
    createMachine,
} from 'xstate'
import { useMachine } from '@xstate/react'
import StyledContainer from '../../../../shared/components/styled/Container'
import StyledHeader from '../../../../shared/components/styled/Header'
import type { Task } from '../../../../shared/types/tasks'
import { useAppContext } from '../../../app-context'
import { useAuthContext } from '../../../auth-context'

export type DataMachineContext = {
    data?: Task[]
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
    const [appData] = useAppContext()
    const [authData, , { logout }] = useAuthContext()

    const [dataMachineState] = useMachine(dataMachine, {
        actions: {
            onErrorEntry: logout,
        },
        services: {
            load: async () => {
                const res = await fetch(
                    `${appData.api.baseUrl}/tasks`,
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
        <StyledContainer>
            <StyledHeader>Dashboard</StyledHeader>
            <pre>
                {JSON.stringify(dataMachineState.context.data, null, 2)}
            </pre>
        </StyledContainer>
    )
}

export default Dashboard
