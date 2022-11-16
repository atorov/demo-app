import type { Task } from '../../../../../../../shared/types/tasks'

async function getOneTask(url: string, accessToken: string): Promise<Task> {
    const res = await fetch(
        url,
        {
            headers: {
                Authorization: accessToken,
            },
        },
    )
    if (res.status !== 200) {
        throw new Error(`Status code: ${res.status}!`)
    }
    return res.json()
}

export default getOneTask
