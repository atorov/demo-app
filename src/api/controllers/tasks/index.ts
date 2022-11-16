import type { Response, Request } from 'express'
import type { Task } from '../../../shared/types/tasks'

declare const tasks: Task[]

export async function getAllTasks(_req: Request, res: Response) {
    await new Promise((resolve) => {
        setTimeout(resolve, 1550)
    })
    return res.json(tasks)
}

export async function getOneTask(req: Request, res: Response) {
    await new Promise((resolve) => {
        setTimeout(resolve, 1550)
    })
    const task = tasks.find((it) => it.id === req.params.taskId)
    if (!task) res.status(404)
    return res.json(task)
}

export default null
