import * as React from 'react'
import { useQuery, useQueries } from '@tanstack/react-query'
import StyledButton from '../../../../../shared/components/styled/Button'
import StyledText from '../../../../../shared/components/styled/Text'
import type { Task } from '../../../../../shared/types/tasks'
import { useAppContext } from '../../../../app-context'
import { useAuthContext } from '../../../../auth-context'
import getOneTask from '../shared/api/get-one-task'
import Card from '../shared/components/Card'

async function getAllTasks(url: string, accessToken: string): Promise<Task[]> {
    const res = await fetch(
        url,
        {
            headers: {
                Authorization: accessToken,
            },
        },
    )
    if (res.status !== 200) {
        throw new Error(`Status code: ${res.status}!`)
    }
    return res.json()
}

async function getFirstTaskInProgress(url: string, accessToken: string): Promise<Task> {
    return getOneTask(url, accessToken)
}

const Tasks = () => {
    const [appData] = useAppContext()
    const [authData] = useAuthContext()

    // Get all tasks query
    const {
        isLoading: isTasksLoading,
        isFetching: isTasksFetching,
        isFetched: isTasksFetched,
        data: tasks,
        isError: isTasksError,
        error: tasksError,
        refetch: refetchTasks,
        remove: removeTasks,
    } = useQuery<Task[], Error>(
        ['tasks'],
        () => getAllTasks(`${appData.api.baseUrl}/tasks`, String(authData.data?.accessToken)),
        {
            // enabled: false, // default: true
            // staleTime: 10_000, // default: 0
            // cacheTime: 30_000, // default: 5_000_000
            // refetchOnMount: true, // default: true
            // refetchOnWindowFocus: true, // default: true
            // refetchInterval: 2_000, // default: false
            // refetchIntervalInBackground: true, // default: false
            // onSuccess: (data) => {
            //     console.log('::: Tasks loaded: ', data)
            // },
            // onError: (reason) => {
            //     console.log('::: Error:', reason.message)
            // },
            select: (data) => data.map((it) => ({ ...it, fetchedAt: Date.now() })),
        },
    )

    const {
        tasksTodo,
        tasksInProgress,
        tasksDone,
    } = React.useMemo(() => (tasks ?? []).reduce((acc, task) => ({
        tasksTodo: task.status === 'todo' ? [...acc.tasksTodo, task] : acc.tasksTodo,
        tasksInProgress: task.status === 'in_progress' ? [...acc.tasksInProgress, task] : acc.tasksInProgress,
        tasksDone: task.status === 'done' ? [...acc.tasksDone, task] : acc.tasksDone,
    }), {
        tasksTodo: [] as Task[],
        tasksInProgress: [] as Task[],
        tasksDone: [] as Task[],
    }), [tasks])

    // Another one, in parallel
    useQuery<Task[], Error>(
        ['health'],
        async () => {
            const res = await fetch(`${appData.api.baseUrl}/../health`)
            if (res.status !== 200) {
                throw new Error(`Status code: ${res.status}!`)
            }
            return res.json()
        },
        {
            onSuccess: (data) => {
                console.log('::: Health status loaded: ', data)
            },
            onError: (reason) => {
                console.log('::: Health status loading error:', reason.message)
            },
        },
    )

    // Dynamic dependant parallel queries
    useQueries({
        queries: (tasks || []).filter((_, idx) => !(idx % 2)).map((it) => ({
            queryKey: ['dpq-task', it.id],
            queryFn: ({ queryKey }: { queryKey: string[] }) => getOneTask(`${appData.api.baseUrl}/tasks/${queryKey[1]}`, String(authData.data?.accessToken)),
        })),
    })

    // Dependant query
    const firstTaskInProgressId: string | undefined = tasksInProgress[0]?.id
    useQuery<Task>(
        ['dq-task', firstTaskInProgressId],
        ({ queryKey }) => getFirstTaskInProgress(`${appData.api.baseUrl}/tasks/${queryKey[1]}`, String(authData.data?.accessToken)),
        {
            enabled: Boolean(firstTaskInProgressId),
        },
    )

    return (
        <>
            <StyledText as="p">
                {`isTasksLoading: ${isTasksLoading}`}
            </StyledText>
            <StyledText as="p">
                {`isTasksFetching: ${isTasksFetching}`}
            </StyledText>
            <StyledText as="p">
                {`isTasksFetched: ${isTasksFetched}`}
            </StyledText>
            <StyledText as="p">
                {`isTasksError: ${isTasksError}`}
            </StyledText>
            <StyledText as="p">
                {`tasksError: ${tasksError?.message}`}
            </StyledText>
            <br />
            {!isTasksLoading && !isTasksError ? (
                <>
                    {tasksTodo.map((task) => <Card key={task.id} task={task} />)}
                    <br />
                    {tasksInProgress.map((task) => <Card key={task.id} task={task} />)}
                    <br />
                    {tasksDone.map((task) => <Card key={task.id} task={task} />)}
                </>
            ) : null}
            <br />
            <StyledButton
                disabled={isTasksFetching}
                onClick={() => {
                    removeTasks()
                    refetchTasks()
                }}
            >
                Refetch tasks
            </StyledButton>
        </>
    )
}

export default Tasks
