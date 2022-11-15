/* eslint-disable no-nested-ternary */
import * as React from 'react'
import styled from 'styled-components'
import type { Task } from '../../../../api/controllers/tasks'
import StyledContainer from '../../../../shared/components/styled/Container'
import StyledHeader from '../../../../shared/components/styled/Header'
import StyledText from '../../../../shared/components/styled/Text'

type TaskProps = {
    task: Task
}

const CustomStyledTask = styled.div<TaskProps>`
    display: flex;
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
        <div>
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
        </div>
        <div style={{ flex: 1 }} />
        <button type="button">
            Delete
        </button>
    </CustomStyledTask>
)

const tasks: Task[] = [
    {
        id: '1',
        name: 'My first task for this week',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        status: 'done',
        categories: ['home'],
        createdAt: 1668467357001,
        updatedAt: 1668467418052,
    },
    {
        id: '2',
        name: 'My second task for this week',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        status: 'in_progress',
        categories: ['home', 'holiday'],
        createdAt: 1668467457001,
        updatedAt: 1668467468052,
    },
    {
        id: '3',
        name: 'My third task for this week',
        status: 'todo',
        createdAt: 1668467458001,
        updatedAt: null,
    },
    {
        id: '4',
        name: 'My 4th task for this week',
        status: 'todo',
        createdAt: 1668467459201,
        updatedAt: null,
    },
]

const Tasks = () => {
    const {
        tasksTodo,
        tasksInProgress,
        tasksDone,
    } = React.useMemo(() => tasks.reduce((acc, task) => {
        console.log()

        return {
            tasksTodo: task.status === 'todo' ? [...acc.tasksTodo, task] : acc.tasksTodo,
            tasksInProgress: task.status === 'in_progress' ? [...acc.tasksInProgress, task] : acc.tasksInProgress,
            tasksDone: task.status === 'done' ? [...acc.tasksDone, task] : acc.tasksDone,
        }
    }, {
        tasksTodo: [] as Task[],
        tasksInProgress: [] as Task[],
        tasksDone: [] as Task[],
    }), [/* tasks */])

    return (
        <StyledContainer>
            <StyledHeader>Tasks</StyledHeader>
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
        </StyledContainer>
    )
}

export default Tasks
