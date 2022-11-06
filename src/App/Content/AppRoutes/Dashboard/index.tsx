// import {
//     assign,
//     createMachine,
// } from 'xstate'
// import { useMachine } from '@xstate/react'
// import type { ResDataItem } from '../../../../api/controllers/data/{{get}}'
// import PrimaryContent from './PrimaryContent'
// import SecondaryContent from './SecondaryContent'
// import Settings from './Settings'

// export type DataMachineContext = {
//     data?: ResDataItem[]
// }

// type DataMachineEvent = {}

// const dataMachine = createMachine({
//     id: 'data',
//     predictableActionArguments: true,
//     tsTypes: {} as import('./index.typegen').Typegen0,
//     schema: {
//         context: {} as DataMachineContext,
//         // events: {} as DataMachineEvent,
//     },
//     context: {},
//     initial: 'pre_loading',
//     states: {
//         pre_loading: {
//             after: {
//                 550: { target: 'loading' },
//             },
//         },
//         loading: {
//             invoke: {
//                 src: 'load',
//                 onDone: {
//                     target: 'done',
//                     actions: assign({
//                         data: (_: DataMachineContext, event) => event.data,
//                     }),
//                 },
//                 onError: {
//                     target: 'done',
//                 },
//             },
//         },
//         done: {
//             type: 'final',
//         },
//     },
// })

const Dashboard = () => {
    console.log('TODO: (dashboard)')

    // const [dataMachineState] = useMachine(dataMachine, {
    //     services: {
    //         load: async () => {
    //             await new Promise((r) => {
    //                 setTimeout(r, 1550)
    //             })
    //             const url = '/api/v1/data'
    //             const res: any = await fetch(
    //                 url,
    //                 {
    //                     headers: {
    //                         Authorization: '123',
    //                     },
    //                 },
    //             )
    //             if (res.status !== 200) {
    //                 throw new Error(`Status code: ${res.status}!`)
    //             }
    //             return res.json()
    //         },
    //     },
    // })

    return (
        <div style={{ overflow: 'auto' }}>
            TODO: Dashboard
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
