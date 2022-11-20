import type { Response, Request } from 'express'
import { nanoid } from 'nanoid'
import type { DbTasks, DbTaskItemValue, Task } from '../../../shared/types/tasks'

declare const tasks: DbTasks

export async function createOneTask(req: Request, res: Response) {
    await new Promise((resolve) => {
        setTimeout(resolve, 1550)
    })
    try {
        const reqData: DbTaskItemValue = req.body
        const id = nanoid()
        tasks.set(id, reqData)
        const savedData = tasks.get(id)
        if (!savedData) return res.status(400).send()
        const resData: Task = { ...savedData, id }
        return res.status(201).json(resData)
    }
    catch (error) {
        return res.status(400).send()
    }
}

export async function deleteOneTask(req: Request, res: Response) {
    await new Promise((resolve) => {
        setTimeout(resolve, 1550)
    })
    const id = req.params.taskId
    const hasKey = tasks.has(id)
    if (!hasKey) return res.status(404).send()
    tasks.delete(id)
    const hasDeletedKey = tasks.has(id)
    if (hasDeletedKey) return res.status(400).send()
    return res.status(204).send()
}

export async function getAllTasks(_req: Request, res: Response) {
    await new Promise((resolve) => {
        setTimeout(resolve, 1550)
    })
    const data: Task[] = Array.from(tasks).map(([id, obj]) => ({ ...obj, id }))
    return res.json(data)
}

export async function getOneTask(req: Request, res: Response) {
    await new Promise((resolve) => {
        setTimeout(resolve, 1550)
    })
    const id = req.params.taskId
    const task = tasks.get(id)
    if (!task) return res.status(404).send()
    const data: Task = { ...task, id }
    return res.json(data)
}

export async function updateOneTask(req: Request, res: Response) {
    await new Promise((resolve) => {
        setTimeout(resolve, 1550)
    })
    const id = req.params.taskId
    const hasKey = tasks.has(id)
    if (!hasKey) return res.status(404).send()
    const { id: _id, ...rest }: Task = req.body
    if (id !== _id) return res.status(422).send()
    try {
        const data: DbTaskItemValue = { ...rest, updatedAt: Date.now() }
        tasks.set(id, data)
        const savedData = tasks.get(id)
        if (!savedData) return res.status(400).send()
        const resData: Task = { ...savedData, id }
        return res.status(201).json(resData)
    }
    catch (error) {
        return res.status(400).send()
    }
}

export default null
