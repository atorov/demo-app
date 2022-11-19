/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react'
import {
    useQueryClient,
    useMutation,
    useQuery,
    useQueries,
} from '@tanstack/react-query'
import styled from 'styled-components'
import StyledButton from '../../../../../shared/components/styled/Button'
import StyledHeader from '../../../../../shared/components/styled/Header'
import StyledInput from '../../../../../shared/components/styled/Input'
import StyledText from '../../../../../shared/components/styled/Text'
import type {
    DbTaskItemValue,
    Task,
    TaskCategory,
} from '../../../../../shared/types/tasks'
import { useAppContext } from '../../../../app-context'
import { useAuthContext } from '../../../../auth-context'
import getOneTask from '../shared/api/get-one-task'
import Card from '../shared/components/Card'

const CustomStyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const CustomStyledInput = styled(StyledInput)`
    margin: 0.5rem 0 0 0;
    width: 24rem;
`

const CustomStyledCatButton = styled(StyledButton)`
    display: inline-block;
    margin: 0.25rem 0;
    width: 8rem;
`

const CustomStyledAddButton = styled(StyledButton)`
    margin: 1.5rem 0;
    width: 8rem;
`

async function addNewTask(url: string, accessToken: string, data: DbTaskItemValue): Promise<Task> {
    const res = await fetch(
        url,
        {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data),
        },
    )
    if (res.status !== 201) {
        throw new Error(`Status code: ${res.status}!`)
    }
    return res.json()
}

async function deleteTask(url: string, accessToken: string) {
    const res = await fetch(
        url,
        {
            headers: {
                Authorization: accessToken,
            },
            method: 'DELETE',
        },
    )
    if (res.status !== 204) {
        throw new Error(`Status code: ${res.status}!`)
    }
}

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

async function updateTask(url: string, accessToken: string, data: DbTaskItemValue): Promise<Task> {
    const res = await fetch(
        url,
        {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
            body: JSON.stringify(data),
        },
    )
    if (res.status !== 201) {
        throw new Error(`Status code: ${res.status}!`)
    }
    return res.json()
}

const Tasks = () => {
    const [appData] = useAppContext()
    const [authData] = useAuthContext()

    const queryClient = useQueryClient()

    // Get all tasks query
    const {
        isLoading: isTasksLoading,
        isFetching: isTasksFetching,
        isFetched: isTasksFetched,
        data: tasks,
        isError: isTasksError,
        error: tasksError,
        refetch: refetchTasks,
        // remove: removeTasks,
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

    const [newTaskName, setNewTaskName] = React.useState('')
    const [newTaskDescription, setNewTaskDescription] = React.useState('')
    const [newTaskCategories, setNewTaskCategories] = React.useState(new Set([] as TaskCategory[]))

    // Mutation: Add new task
    const handleCategoryChange = (cat: TaskCategory) => {
        setNewTaskCategories((prev) => {
            const updated = new Set(prev)
            if (updated.has(cat)) updated.delete(cat)
            else updated.add(cat)
            return updated
        })
    }

    const {
        isLoading: isNewTaskLoading,
        isError: isNewTaskError,
        error: newTaskError,
        mutate: addNewTaskMutation,
    } = useMutation<Task, Error, DbTaskItemValue, { snapshotTasks: Task[] }>(
        (data) => addNewTask(`${appData.api.baseUrl}/tasks`, String(authData.data?.accessToken), data),
        {
            // Option #1: on success
            // onSuccess: () => {
            //     queryClient.invalidateQueries(['tasks'])
            // },
            // Option #2: on success update query cache with response data
            // onSuccess: (data) => {
            //     queryClient.setQueryData<Task[]>(['tasks'], (prev = []) => [...prev, { ...data, id: String(Math.random()) }])
            // },
            // Option #3: Optimistic update
            onMutate: async (data) => {
                await queryClient.cancelQueries(['tasks'])
                const snapshotTasks: Task[] = queryClient.getQueryData(['tasks']) || []
                queryClient.setQueryData<Task[]>(['tasks'], (prev = []) => [...prev, { ...data, id: String(prev.length + 1), isCachedFromOptimisticUpdate: true }])
                return { snapshotTasks }
            },
            onError: (_error, _data, context) => {
                queryClient.setQueriesData(['tasks'], context?.snapshotTasks)
            },
            onSettled: () => {
                queryClient.invalidateQueries(['tasks'])
            },
            onSuccess: () => {
                setNewTaskName('')
                setNewTaskDescription('');
                (['home', 'work', 'holiday'] as TaskCategory[]).forEach((it) => {
                    handleCategoryChange(it)
                })
            },
        },
    )

    // Mutation: Update existing task
    const { mutate: updateTaskMutation } = useMutation<Task, Error, Task, { snapshotTasks: Task[] }>(
        (data) => updateTask(`${appData.api.baseUrl}/tasks/${data.id}`, String(authData.data?.accessToken), data),
        {
            onMutate: async (data) => {
                await queryClient.cancelQueries(['tasks'])
                const snapshotTasks: Task[] = queryClient.getQueryData(['tasks']) || []
                queryClient.setQueryData<Task[]>(['tasks'], (prev = []) => prev.map((it) => {
                    if (it.id === data.id) return data
                    return it
                }))
                return { snapshotTasks }
            },
            onError: (_error, _data, context) => {
                queryClient.setQueriesData(['tasks'], context?.snapshotTasks)
            },
            onSettled: () => {
                queryClient.invalidateQueries(['tasks'])
            },
        },
    )

    // Mutation: Delete existing task
    const { mutate: deleteTaskMutation } = useMutation<void, Error, Task['id'], { snapshotTasks: Task[] }>(
        (id) => deleteTask(`${appData.api.baseUrl}/tasks/${id}`, String(authData.data?.accessToken)),
        {
            onMutate: async (id) => {
                await queryClient.cancelQueries(['tasks'])
                const snapshotTasks: Task[] = queryClient.getQueryData(['tasks']) || []
                queryClient.setQueryData<Task[]>(['tasks'], (prev = []) => prev.filter((it) => it.id !== id))
                return { snapshotTasks }
            },
            onError: (_error, _data, context) => {
                queryClient.setQueriesData(['tasks'], context?.snapshotTasks)
            },
            onSettled: () => {
                queryClient.invalidateQueries(['tasks'])
            },
        },
    )

    const handleStatusChange = (task: Task) => {
        const newTask = { ...task }
        if (task.status === 'todo') {
            newTask.status = 'in_progress'
            updateTaskMutation(newTask)
        }
        else if (task.status === 'in_progress') {
            newTask.status = 'done'
            updateTaskMutation(newTask)
        }
        else if (task.status === 'done') {
            deleteTaskMutation(newTask.id)
        }
    }

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
                    {tasksTodo.map((task) => <Card key={task.id} task={task} handleStatusChange={() => handleStatusChange(task)} />)}
                    <br />
                    {tasksInProgress.map((task) => <Card key={task.id} task={task} handleStatusChange={() => handleStatusChange(task)} />)}
                    <br />
                    {tasksDone.map((task) => <Card key={task.id} task={task} handleStatusChange={() => handleStatusChange(task)} />)}
                </>
            ) : null}
            <br />

            <StyledButton
                disabled={isTasksFetching}
                onClick={() => {
                    // removeTasks()
                    refetchTasks()
                }}
            >
                Refetch tasks
            </StyledButton>
            <br />

            {!isTasksLoading && !isTasksError ? (
                <>
                    <br />
                    <br />
                    <StyledHeader>
                        New task
                    </StyledHeader>
                    <CustomStyledForm
                        onSubmit={async (event) => {
                            event.preventDefault()
                            const categories = Array.from(newTaskCategories)
                            const data: DbTaskItemValue = {
                                name: newTaskName,
                                status: 'todo',
                                description: newTaskDescription,
                                categories,
                                createdAt: Date.now(),
                                updatedAt: null,
                            }
                            addNewTaskMutation(data)
                            // refetchTasks()<-- this doesn't work quite well, seems needs more time between 'add new' and 'get all'
                        }}
                    >
                        <CustomStyledInput
                            placeholder="Name"
                            value={newTaskName}
                            disabled={isNewTaskLoading}
                            required
                            onChange={(event) => {
                                setNewTaskName(event.target.value)
                            }}
                        />
                        <CustomStyledInput
                            placeholder="Description"
                            value={newTaskDescription}
                            disabled={isNewTaskLoading}
                            onChange={(event) => {
                                setNewTaskDescription(event.target.value)
                            }}
                        />
                        <br />
                        <StyledText as="p">
                            Categories
                        </StyledText>
                        <CustomStyledCatButton
                            disabled={isNewTaskLoading}
                            onClick={() => {
                                handleCategoryChange('home')
                            }}
                        >
                            {newTaskCategories.has('home') ? '• ' : ''}
                            home
                        </CustomStyledCatButton>
                        <CustomStyledCatButton
                            disabled={isNewTaskLoading}
                            onClick={() => {
                                handleCategoryChange('work')
                            }}
                        >
                            {newTaskCategories.has('work') ? '• ' : ''}
                            work
                        </CustomStyledCatButton>
                        <CustomStyledCatButton
                            disabled={isNewTaskLoading}
                            onClick={() => {
                                handleCategoryChange('holiday')
                            }}
                        >
                            {newTaskCategories.has('holiday') ? '• ' : ''}
                            holiday
                        </CustomStyledCatButton>
                        <CustomStyledAddButton
                            type="submit"
                            disabled={isNewTaskLoading}
                        >
                            Add
                        </CustomStyledAddButton>
                        {isNewTaskError ? (
                            <StyledText as="p">
                                {newTaskError.message}
                            </StyledText>
                        ) : null}
                    </CustomStyledForm>
                </>
            ) : null}
        </>
    )
}

export default Tasks
