import compression from 'compression'
import debug from 'debug'
import express from 'express'
import type {
    NextFunction,
    Response,
    Request,
} from 'express'
import fs from 'fs'
import helmet from 'helmet'
import dataRoutes from './routes/data'
import HttpException from './shared/http-exception'

const print = debug('server')

function createServer() {
    const packageRawData = fs.readFileSync('package.json', 'utf8')
    const packageData = JSON.parse(packageRawData)
    const {
        name: projectName,
        version: projectVersion,
    } = packageData
    print('::: Project:', projectName, projectVersion)

    const server = express()

    server.use(helmet())
    server.use(compression())
    server.use(express.json())

    server.use((_, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
        next()
    })

    server.get('/api/health', (_, res) => {
        res.json({
            message: 'Server is up and running...',
        })
    })

    server.use('/api/v1/data', dataRoutes)

    server.use(() => {
        throw new HttpException('::: Error! Could not find this route!', 404)
    })

    server.use((
        err: Error & { code: number },
        _: Request,
        res: Response,
        next: NextFunction,
    ) => {
        print('::: Error!:', err)
        if (res.headersSent) {
            return next(err)
        }
        res.status(err.code || 500)
        return res.json({ message: err.message || '::: Error! An unknown error ocurred!' })
    })

    return server
}

export default createServer
