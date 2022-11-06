import type { Response, Request } from 'express'

export type ResDataItem = {
    id: string
    text: string
}

async function getData(_req: Request, res: Response) {
    const resData: ResDataItem[] = [
        {
            id: '1',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        },
        {
            id: '2',
            text: 'Earum officiis illo, dignissimos accusamus voluptas porro possimus nemo, cupiditate in at, ullam doloribus reprehenderit rem.',
        },
        {
            id: '3',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nesciunt nam quisquam eius commodi! Earum officiis illo, dignissimos accusamus voluptas porro possimus nemo, cupiditate in at, ullam doloribus reprehenderit rem.',
        },
        {
            id: '4',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nesciunt nam quisquam eius commodi! Earum officiis illo, dignissimos accusamus voluptas porro possimus nemo, cupiditate in at, ullam doloribus reprehenderit rem.',
        },
    ]

    return res.json(resData)
}

export default getData
