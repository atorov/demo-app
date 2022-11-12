import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import StyledButton from '../../../../../shared/components/styled/Button'
import StyledInput from '../../../../../shared/components/styled/Input'
import StyledText from '../../../../../shared/components/styled/Text'
import type { Message } from '../../../../../ws/index'
import { useAuthContext } from '../../../../auth-context'

declare const BUILD_ENV: string

const CustomStyledText = styled(StyledText)`
    display: block;
    margin: 1rem 0;
    color: yellowgreen;
`

type TCustomStyledMessageProps = {
    isItMe: boolean
}

const CustomStyledMessage = styled.article<TCustomStyledMessageProps>`
    width: ${(props) => (props.isItMe ? 'auto' : 'max-content')};
    margin: 0.25rem;
    margin-left: ${(props) => {
        const ml = props.isItMe ? '2rem' : undefined
        return ml
    }};
    padding: 0.25rem;
    border-radius: 0.25rem;
    background: ${(props) => {
        const bgnd = props.isItMe ? 'lightgreen' : 'lightblue'
        return bgnd
    }};
`

const CustomStyledInput = styled(StyledInput)`
    margin: 1rem 0 0 0;
    width: 12rem;
`

const CustomStyledButton = styled(StyledButton)`
    margin: 0.5rem 0 0 0;
    width: 12rem;
`

const CustomStyledMessageHeader = styled(StyledText)`
    font-size: 0.75rem;
`
type TCustomStyledMessageBodyProps = {
    isItMe: boolean
}

const CustomStyledMessageBody = styled(StyledText)<TCustomStyledMessageBodyProps>`
    color: ${(props) => {
        const bgnd = props.isItMe ? 'darkgreen' : 'darkblue'
        return bgnd
    }};
`

const Chat = () => {
    const [authData] = useAuthContext()
    const navigate = useNavigate()

    const [newMessageBody, setNewMessageBody] = React.useState('')
    const [messages, setMessages] = React.useState<Message[]>([])
    const [isConnectionOpen, setConnectionOpen] = React.useState(false)

    const ws = React.useRef<WebSocket>()
    React.useEffect(() => {
        ws.current = new WebSocket(BUILD_ENV === 'local' ? 'ws://localhost:3001' : 'wss://demo-app-ws-production.up.railway.app/') // TODO:

        ws.current.onopen = () => {
            setConnectionOpen(true)
        }

        ws.current.onmessage = (event) => {
            const data: Message = JSON.parse(event.data)
            setMessages((prev) => [...prev, data])
        }

        ws.current.onclose = async (event) => {
            if (event.code === 4000) {
                navigate('/chat/kicked', { state: { kickReason: event.reason } })
            }
        }

        const _ws = ws.current
        return () => {
            _ws.close()
        }
    }, [navigate])

    const scrollTarget = React.useRef<HTMLDivElement>(null)
    React.useEffect(() => {
        if (scrollTarget.current) {
            scrollTarget.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages.length])

    return (
        <>
            <CustomStyledText>
                {`You are chatting as [${authData.data?.name}]`}
            </CustomStyledText>
            {messages.map((message, idx) => {
                const isItMe = authData.data?.name === message.sender
                return (
                    <CustomStyledMessage
                        key={`${message.sentAt}-${idx}`}
                        isItMe={isItMe}
                    >
                        <CustomStyledMessageHeader>
                            {new Date(message.sentAt).toLocaleTimeString(undefined, { timeStyle: 'short' })}
                        &nbsp;
                            {message.sender === authData.data?.name ? 'You' : message.sender}
                        </CustomStyledMessageHeader>
                        <br />
                        <CustomStyledMessageBody isItMe={isItMe}>
                            {message.body}
                        </CustomStyledMessageBody>
                    </CustomStyledMessage>
                )
            })}

            <form
                onSubmit={(event) => {
                    event?.preventDefault()
                    if (!newMessageBody) {
                        return
                    }
                    const newMessage = JSON.stringify({
                        sender: authData.data?.name,
                        body: newMessageBody,
                    })
                    ws.current?.send(newMessage)
                    setNewMessageBody('')
                }}
            >
                <CustomStyledInput
                    placeholder="Type a message"
                    value={newMessageBody}
                    autoComplete="off"
                    disabled={!isConnectionOpen}
                    onChange={(event) => {
                        setNewMessageBody(event.target.value)
                    }}
                />
                <br />
                <CustomStyledButton
                    type="submit"
                    disabled={!isConnectionOpen}
                >
                    Send
                </CustomStyledButton>
            </form>
            <br />
            <br />
            <br />

            <div ref={scrollTarget} />
        </>
    )
}

export default Chat
