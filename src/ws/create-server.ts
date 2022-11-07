import { WebSocketServer } from 'ws'

function createServer() {
    if (!process.env.WS_PORT) {
        throw new Error('::: process.env.WS_PORT is not defined!')
    }

    const server = new WebSocketServer(
        { port: Number(process.env.WS_PORT) },
        () => {
            console.log(`Server running on port ${process.env.WS_PORT}...`)
        },
    )

    return server
}

export default createServer
