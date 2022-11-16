export type PaginatedDataItem = {
    id: string
    text: string
}

export type PaginatedData = {
    items: PaginatedDataItem[]
    count: number
    page: number
    countPerPage: number
    totalCount: number
    totalPages: number
}
