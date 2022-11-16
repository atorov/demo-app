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
import paginatedDataRoutes from './routes/paginated-data'
import tasksRoutes from './routes/tasks'
import HttpException from './shared/http-exception'

(global as any).tasks = [
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

    server.use('/api/v1/paginated-data', paginatedDataRoutes)
    server.use('/api/v1/tasks', tasksRoutes)

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
