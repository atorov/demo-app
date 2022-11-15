import {
    assign,
    createMachine,
} from 'xstate'
import { useMachine } from '@xstate/react'
import type { Task } from '../../../../api/controllers/tasks'
import StyledContainer from '../../../../shared/components/styled/Container'
import StyledHeader from '../../../../shared/components/styled/Header'
import { useAuthContext } from '../../../auth-context'

declare const BUILD_ENV: string

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
    const [authData, , { logout }] = useAuthContext()

    const [dataMachineState] = useMachine(dataMachine, {
        actions: {
            onErrorEntry: logout,
        },
        services: {
            load: async () => {
                const url = BUILD_ENV === 'local' ? '/api/v1/tasks' : 'https://demo-app-api-production.up.railway.app/api/v1/tasks'
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
        <StyledContainer>
            <StyledHeader>Dashboard</StyledHeader>
            <pre>
                {JSON.stringify(dataMachineState.context.data, null, 2)}
            </pre>
        </StyledContainer>
    )
}

export default Dashboard
