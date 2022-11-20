/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ErrorBoundary from '../../../../../../../shared/components/ErrorBoundary'
import StyledButton from '../../../../../../../shared/components/styled/Button'
import StyledText from '../../../../../../../shared/components/styled/Text'
import { TaskSchema } from '../../../../../../../shared/types/tasks'
import type { Task } from '../../../../../../../shared/types/tasks'

type CardProps = {
    task: Task
    showButtons?: boolean
    handleStatusChange?: () => void
}

const CustomStyledButton = styled(StyledButton)<CardProps>`
    & {
        background: none;
        color: white !important;
    }
`

const CustomStyledTask = styled.div<CardProps>`
    margin: 0.5rem 0;
    padding: 0.5rem;
    border: ${(props) => `1px solid ${props.task.status !== 'done' ? props.theme.palette.border.accent : props.theme.palette.border.primary}`};
    border-radius: ${(props) => props.theme.border.radius};
    background: ${(props) => (props.task.status === 'todo' ? props.theme.palette.background.primary : props.task.status === 'in_progress' ? props.theme.palette.background.accent : props.theme.palette.background.disabled)};
    * {
        color: ${(props) => (props.task.status === 'todo' ? props.theme.palette.text.primary : props.task.status === 'in_progress' ? props.theme.palette.text.accent : props.theme.palette.text.disabled)};
    }
`

const Card = (props: CardProps) => {
    const parsedTask = TaskSchema.parse(props.task)

    return (
        <CustomStyledTask {...props} task={parsedTask}>
            <StyledText as="p">
                {parsedTask.name}
            </StyledText>
            <StyledText as="em">
                {parsedTask.description}
            </StyledText>
            <StyledText as="p">
                {`Categories: ${parsedTask.categories?.join(', ') || '-'}`}
            </StyledText>
            <StyledText as="p">
                {`Status: ${parsedTask.status}`}
            </StyledText>
            <StyledText as="p">
                {`Created at: ${new Date(parsedTask.createdAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}, Updated at: ${parsedTask.updatedAt ? new Date(parsedTask.updatedAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' }) : '-'}`}
            </StyledText>
            {parsedTask.fetchedAt ? (
                <StyledText as="p">
                    {`Fetched at: ${new Date(parsedTask.fetchedAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}`}
                </StyledText>
            ) : null}
            <StyledText as="p">
                {`It is cached from the tasks list: ${Boolean(parsedTask.isCachedFromTheList)}`}
            </StyledText>
            {props.showButtons ? (
                <>
                    <br />
                    {!parsedTask.isCachedFromOptimisticUpdate ? (
                        <>
                            <Link to={`${parsedTask.id}`}>
                                View details
                            </Link>
                        &nbsp;|&nbsp;
                        </>
                    ) : null}
                    {parsedTask.status === 'todo' ? (
                        <CustomStyledButton {...props} onClick={props.handleStatusChange}>
                            Start this task
                        </CustomStyledButton>
                    ) : null}
                    {parsedTask.status === 'in_progress' ? (
                        <CustomStyledButton {...props} onClick={props.handleStatusChange}>
                            Complete this task
                        </CustomStyledButton>
                    ) : null}
                    {parsedTask.status === 'done' ? (
                        <CustomStyledButton {...props} onClick={props.handleStatusChange}>
                            Delete this task
                        </CustomStyledButton>
                    ) : null}
                </>
            ) : null}
        </CustomStyledTask>
    )
}

Card.defaultProps = {
    showButtons: true,
    handleStatusChange: () => {},
}

const CardWrapper = (props: CardProps) => (
    <ErrorBoundary>
        <Card {...props} />
    </ErrorBoundary>
)

CardWrapper.defaultProps = {
    showButtons: true,
    handleStatusChange: () => {},
}

export default CardWrapper
