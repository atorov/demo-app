import axios from 'axios'
import crypto from 'crypto'
import debug from 'debug'
import type { Response, Request, NextFunction } from 'express'
import cache from '../../shared/cache'

const print = debug('server')

async function checkAuth(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        return next()
    }

    const accessToken = req.headers.authorization
    if (!accessToken) {
        return res
            .status(400)
            .send({
                message: '::: Error! Could not find the access token!',
            })
    }

    const hash = crypto.createHash('sha1').update(accessToken).digest('hex')
    const hasKey = cache.has(hash)
    if (hasKey) {
        return next()
    }

    print('::: External auth check')

    const url = 'https://uman-api-production.up.railway.app/api/auth'
    try {
        await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        cache.set(hash, true, 60 * 60 * 12)
        return next()
    }
    catch (reason) {
        return res
            .status(401)
            .send({
                message: '::: Error! Could not authenticate this user!',
            })
    }
}

export default checkAuth
