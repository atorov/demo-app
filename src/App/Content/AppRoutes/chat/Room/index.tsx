import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import type { Message } from '../../../../../ws/index'
import { useAuthContext } from '../../../../auth-context'

declare const BUILD_ENV: string

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
            {messages.map((message, idx) => (
                <article
                    key={`${message.sentAt}-${idx}`}
                    style={{
                        background: message.sender === authData.data?.name ? 'lightblue' : 'lightgreen',
                    }}
                >
                    <span>
                        {message.sender === authData.data?.name ? 'You' : message.sender}
                    </span>
                    <span>
                        @
                        {new Date(message.sentAt).toLocaleTimeString(undefined, { timeStyle: 'short' })}
                    </span>
                    <p>
                        {message.body}
                    </p>
                </article>
            ))}

            <p>
                {`You are chatting as ${authData.data?.name}`}
            </p>
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
                <input
                    placeholder="Type a message"
                    value={newMessageBody}
                    autoComplete="off"
                    disabled={!isConnectionOpen}
                    onChange={(event) => {
                        setNewMessageBody(event.target.value)
                    }}
                />
                <button
                    type="submit"
                    disabled={!isConnectionOpen}
                >
                    Send
                </button>
            </form>
            <br />
            <br />
            <br />

            <div ref={scrollTarget} />
        </>
    )
}

export default Chat
