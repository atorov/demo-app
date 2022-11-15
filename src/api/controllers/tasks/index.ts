import type { Response, Request } from 'express'

export type Task = {
    id: string
    name: string
    description?: string
    status: 'todo' | 'in_progress' | 'done'
    categories?: ('home' | 'work' | 'holiday')[]
    createdAt: number
    updatedAt: number | null
}

export async function getAllTasks(_req: Request, res: Response) {
    const resData: Task[] = [
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
    ]

    return res.json(resData)
}
