/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import StyledButton from '../../../../../../../shared/components/styled/Button'
import StyledText from '../../../../../../../shared/components/styled/Text'
import type { Task } from '../../../../../../../shared/types/tasks'

type CardProps = {
    task: Task
    showButtons?: boolean
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

const Card = (props: CardProps) => (
    <CustomStyledTask {...props}>
        <StyledText as="p">
            {props.task.name}
        </StyledText>
        <StyledText as="em">
            {props.task.description}
        </StyledText>
        <StyledText as="p">
            {`Categories: ${props.task.categories?.join(', ') || '-'}`}
        </StyledText>
        <StyledText as="p">
            {`Status: ${props.task.status}`}
        </StyledText>
        <StyledText as="p">
            {`Created at: ${new Date(props.task.createdAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}, Updated at: ${props.task.updatedAt ? new Date(props.task.updatedAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' }) : '-'}`}
        </StyledText>
        {props.task.fetchedAt ? (
            <StyledText as="p">
                {`Fetched at: ${new Date(props.task.fetchedAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}`}
            </StyledText>
        ) : null}
        <StyledText as="p">
            {`It is cached from the tasks list: ${Boolean(props.task.isCachedFromTheList)}`}
        </StyledText>
        {props.showButtons ? (
            <>
                <br />
                <Link to={`${props.task.id}`}>
                    View details
                </Link>
                &nbsp;|&nbsp;
                {props.task.status === 'todo' ? (
                    <CustomStyledButton {...props}>
                        Start this task
                    </CustomStyledButton>
                ) : null}
                {props.task.status === 'in_progress' ? (
                    <CustomStyledButton {...props}>
                        Complete this task
                    </CustomStyledButton>
                ) : null}
                {props.task.status === 'done' ? (
                    <CustomStyledButton {...props}>
                        Delete this task
                    </CustomStyledButton>
                ) : null}
            </>
        ) : null}
    </CustomStyledTask>
)

Card.defaultProps = {
    showButtons: true,
}

export default Card
