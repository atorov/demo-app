import type { Response, Request } from 'express'
import type { PaginatedData, PaginatedDataItem } from '../../../shared/types/paginated-data'

const PAGINATED_DATA_ITEMS: PaginatedDataItem[] = [
    {
        id: '1',
        text: 'First item',
    },
    {
        id: '2',
        text: 'Second item',
    },
    {
        id: '3',
        text: 'Third item',
    },
    {
        id: '4',
        text: 'Fourth item',
    },
    {
        id: '5',
        text: 'Fifth item',
    },
    {
        id: '6',
        text: 'Sixth item',
    },
    {
        id: '7',
        text: 'Seventh item',
    },
    {
        id: '8',
        text: 'Eighth item',
    },
    {
        id: '9',
        text: 'Ninth item',
    },
    {
        id: '10',
        text: 'Tenth item',
    },
    {
        id: '11',
        text: 'Eleventh item',
    },
    {
        id: '12',
        text: 'Twelfth item',
    },
    {
        id: '13',
        text: 'Thirteenth item',
    },
    {
        id: '14',
        text: 'Fourteenth item',
    },
    {
        id: '15',
        text: 'Fifteenth item',
    },
    {
        id: '16',
        text: 'Sixteenth item',
    },
    {
        id: '17',
        text: 'Seventeenth item',
    },
]

export async function getDataItemsPage(req: Request, res: Response) {
    await new Promise((resolve) => {
        setTimeout(resolve, 1550)
    })
    const countPerPage = 3
    const page = Number(req.query.page ?? 1)
    const firstIndex = (page - 1) * countPerPage
    const lastIndex = firstIndex + countPerPage
    const items = PAGINATED_DATA_ITEMS.slice(firstIndex, lastIndex)
    const count = items.length
    const totalCount = PAGINATED_DATA_ITEMS.length
    const totalPages = Math.ceil(totalCount / countPerPage)
    const responseObject: PaginatedData = {
        items, count, page, countPerPage, totalCount, totalPages,
    }
    return res.json(responseObject)
}

export default null
