import {
    useLocation,
    useNavigate,
} from 'react-router-dom'
import type { Location } from 'react-router-dom'
import {
    assign,
    createMachine,
} from 'xstate'
import { useMachine } from '@xstate/react'
import { useAuthContext } from '../../../auth-context'
import type { AuthState } from '../../../auth-context'

export type LoginMachineContext = {
    errorMessage: string
    name: string
    password: string
    loginData?: AuthState['data']
}

type LoginMachineEvent = {
    type: 'LOGIN'
} | {
    type: 'SET_NAME'
    name: string
} | {
    type: 'SET_PASSWORD'
    password: string
}

const loginMachine = createMachine({
    id: 'login',
    predictableActionArguments: true,
    tsTypes: {} as import('./index.typegen').Typegen0,
    schema: {
        context: {} as LoginMachineContext,
        events: {} as LoginMachineEvent,
    },
    context: {
        name: '',
        password: '',
        errorMessage: '',
    },
    initial: 'entering_credentials',
    states: {
        entering_credentials: {
            always: [
                { target: 'done', cond: 'isAuth' },
            ],
            on: {
                LOGIN: {
                    target: 'logging_in',
                    cond: (context) => !!context.name && !!context.password,
                },
                SET_NAME: {
                    actions: assign <LoginMachineContext, Extract<LoginMachineEvent, { type: 'SET_NAME' }>>({
                        name: (_, event) => event.name,
                        errorMessage: () => '',
                    }),
                },
                SET_PASSWORD: {
                    actions: assign<LoginMachineContext, Extract<LoginMachineEvent, { type: 'SET_PASSWORD' }>>({
                        errorMessage: () => '',
                        password: (_, event) => event.password,
                    }),
                },
            },
        },
        logging_in: {
            entry: assign({
                errorMessage: () => '',
            }),
            invoke: {
                src: 'login',
                onDone: {
                    target: 'done',
                    actions: assign({
                        loginData: (_: LoginMachineContext, event) => (event.data?.data ?? event.data) as LoginMachineContext['loginData'],
                    }),
                },
                onError: {
                    target: 'entering_credentials',
                    actions: assign({
                        errorMessage: () => 'Invalid credentials, could not authenticate!',
                    }),
                },
            },
        },
        done: {
            // type: 'final',
            // entry: 'onDoneEntry',
            after: {
                0: { actions: 'onDoneEntry' },
            },
        },
    },
})

const Login = () => {
    const [, setAuthState, { isAuth }] = useAuthContext()

    const location = useLocation()
    const navigate = useNavigate()

    const [loginMachineState, loginMachineSend] = useMachine(loginMachine, {
        actions: {
            onDoneEntry: (context) => {
                if (!isAuth) {
                    setAuthState({
                        status: 'authenticated',
                        data: context.loginData,
                    })
                }
                const { state: locationState } = location as Location & { state: { from?: { pathname?: string } } | null }
                const fromPathname = locationState?.from?.pathname ?? '/'
                navigate(fromPathname, { replace: true })
            },
        },
        guards: {
            isAuth: () => isAuth,
        },
        services: {
            login: async (context) => {
                const url = 'https://uman-api-production.up.railway.app/api/auth'
                const data = {
                    name: context.name,
                    password: context.password,
                }
                const res = await fetch(url, {
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                    mode: 'cors',
                })
                if (!res.ok) {
                    throw new Error(`Status code: ${res.status}!`)
                }
                return res.json()
            },
        },
    })

    return (
        <>
            <form
                onSubmit={async (event) => {
                    event.preventDefault()
                    loginMachineSend('LOGIN')
                }}
            >
                <input
                    type="text"
                    placeholder="Name"
                    value={loginMachineState.context.name}
                    disabled={!loginMachineState.matches('entering_credentials')}
                    required
                    onChange={(event) => {
                        loginMachineSend({
                            type: 'SET_NAME',
                            name: event.target.value,
                        })
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={loginMachineState.context.password}
                    disabled={!loginMachineState.matches('entering_credentials')}
                    required
                    onChange={(event) => {
                        loginMachineSend({
                            type: 'SET_PASSWORD',
                            password: event.target.value,
                        })
                    }}
                />
                <button
                    type="submit"
                    disabled={!loginMachineState.can('LOGIN') || !!loginMachineState.context.errorMessage}
                >
                    Log in
                </button>
            </form>

            {loginMachineState.context.errorMessage ? (
                <p>
                    {loginMachineState.context.errorMessage}
                </p>
            ) : null}
        </>
    )
}

export default Login
