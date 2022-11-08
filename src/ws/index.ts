import type { WebSocket as TWebSocket } from 'ws'
import createServer from './create-server'

const PORT = process.env.WS_PORT ?? process.env.PORT

console.log(`::: WS PORT: ${PORT}`)

type UserRef = {
    socket: TWebSocket
    lastActiveAt: number
}

export type Message = {
    sender: string
    body: string
    sentAt: number
}

const recentMessages: Message[] = []
const server = createServer(PORT)
const userRefs = new Set<UserRef>()

function removeInactiveUsers() {
    const now = Date.now()
    userRefs.forEach((userRef) => {
        if (userRef.lastActiveAt < now - 1 * 60 * 1000) { // 1 min
            userRef.socket.close(4000, 'inactivity')
        }
    })
}

function sendMessage(message: Message) {
    userRefs.forEach((userRef) => {
        userRef.socket.send(JSON.stringify(message))
    })
}

server.on('connection', (socket) => {
    removeInactiveUsers()

    const userRef = {
        socket,
        lastActiveAt: Date.now(),
    }
    userRefs.add(userRef)

    socket.on('message', (message) => {
        removeInactiveUsers()

        try {
            const parsedMessage = JSON.parse(message as unknown as string)
            if (
                typeof parsedMessage.sender !== 'string'
                || typeof parsedMessage.body !== 'string'
            ) {
                console.error('::: Error: Invalid message received!', message)
                return
            }

            const numberOfRecentMessages = recentMessages
                .filter((msg) => msg.sender === parsedMessage.sender)
                .length
            if (numberOfRecentMessages >= 30) {
                socket.close(4000, 'flooding the chat');
                return
            }

            userRef.lastActiveAt = Date.now()

            const verifiedMessage = {
                sender: parsedMessage.sender as string,
                body: parsedMessage.body as string,
                sentAt: Date.now(),
            }
            sendMessage(verifiedMessage)
            recentMessages.push(verifiedMessage)

            setTimeout(() => {
                recentMessages.shift()
            }, 60000)
        }
        catch (error) {
            console.error('::: Error parsing message!', error)
        }
    })

    socket.on('close', (code, reason) => {
        console.log(`::: User disconnected with code ${code} and reason ${reason}`)
        userRefs.delete(userRef)
    })
})
