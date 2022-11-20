import { WebSocketServer } from 'ws'

function createServer(port?: string) {
    if (!port) {
        throw new Error('::: port is not defined!')
    }

    const server = new WebSocketServer(
        { port: Number(port) },
        () => {
            console.log(`::: Server running on port ${port}...`)
        },
    )

    return server
}

export default createServer
