/* eslint-disable no-nested-ternary */
import * as React from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import type { Task } from '../../../../api/controllers/tasks'
import StyledButton from '../../../../shared/components/styled/Button'
import StyledContainer from '../../../../shared/components/styled/Container'
import StyledHeader from '../../../../shared/components/styled/Header'
import StyledText from '../../../../shared/components/styled/Text'
import { useAppContext } from '../../../app-context'
import { useAuthContext } from '../../../auth-context'

type TaskProps = {
    task: Task
}

const CustomStyledButton = styled(StyledButton)<TaskProps>`
    & {
        background: none;
        color: white !important;
    }
`

const CustomStyledTask = styled.div<TaskProps>`
    margin: 0.5rem;
    padding: 0.5rem;
    border: ${(props) => `1px solid ${props.task.status !== 'done' ? props.theme.palette.border.accent : props.theme.palette.border.primary}`};
    border-radius: ${(props) => props.theme.border.radius};
    background: ${(props) => (props.task.status === 'todo' ? props.theme.palette.background.primary : props.task.status === 'in_progress' ? props.theme.palette.background.accent : props.theme.palette.background.disabled)};
    * {
        color: ${(props) => (props.task.status === 'todo' ? props.theme.palette.text.primary : props.task.status === 'in_progress' ? props.theme.palette.text.accent : props.theme.palette.text.disabled)};
    }
`

const TaskCard = (props: TaskProps) => (
    <CustomStyledTask {...props}>
        <StyledText as="p">
            {props.task.name}
        </StyledText>
        <StyledText as="p">
            {props.task.description}
        </StyledText>
        <StyledText as="p">
            {`Categories: ${props.task.categories?.join(', ') || '-'}`}
        </StyledText>
        <StyledText as="p">
            {`Created at: ${new Date(props.task.createdAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}, Updated at: ${props.task.updatedAt ? new Date(props.task.updatedAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' }) : '-'}`}
        </StyledText>
        <br />
        {props.task.status === 'todo' ? (
            <CustomStyledButton {...props}>
                Start
            </CustomStyledButton>
        ) : null}
        {props.task.status === 'in_progress' ? (
            <CustomStyledButton {...props}>
                Complete
            </CustomStyledButton>
        ) : null}
        {props.task.status === 'done' ? (
            <CustomStyledButton {...props}>
                Delete
            </CustomStyledButton>
        ) : null}
    </CustomStyledTask>
)

async function getAllTasks(baseUrl: string, accessToken: string) {
    const url = baseUrl + '/tasks'
    const res: any = await fetch(
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

const Tasks = () => {
    const [appData] = useAppContext()
    const [authData] = useAuthContext()

    const {
        isLoading: isTasksLoading,
        isFetching: isTasksFetching,
        isFetched: isTasksFetched,
        data: tasks,
        isError: isTasksError,
        error: tasksError,
    } = useQuery<Task[], Error>(
        'tasks',
        () => getAllTasks(appData.api.baseUrl, String(authData.data?.accessToken)),
        {
            // staleTime: 10_000, // default: 0
            // cacheTime: 30_000, // default: 5_000_000
            // refetchOnMount: true, // default: true
            // refetchOnWindowFocus: true, // default: true
            // refetchInterval: 2_000, // default: false
            // refetchIntervalInBackground: true, // default: false
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

    return (
        <StyledContainer>
            <StyledHeader>Tasks</StyledHeader>

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

            {!isTasksLoading && !isTasksError ? (
                <>
                    {tasksTodo.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                        />
                    ))}
                    <br />
                    {tasksInProgress.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                        />
                    ))}
                    <br />
                    {tasksDone.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                        />
                    ))}
                </>
            ) : null}
        </StyledContainer>
    )
}

export default Tasks
