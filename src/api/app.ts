import debug from 'debug'
import type { AddressInfo } from 'net'
import createServer from './create-server'

const print = debug('server')

print(`::: BUILD_ENV: ${process.env.BUILD_ENV}`)
print(`::: DEBUG: ${process.env.DEBUG}`)
print(`::: PORT: ${process.env.PORT}`)

const server = createServer()
const s = server.listen(process.env.PORT, () => {
    const addressInfo = <AddressInfo>s.address()
    const h = addressInfo.address
    const p = addressInfo.port
    print(`::: Server listening at http://${h}:${p}.`)
})
