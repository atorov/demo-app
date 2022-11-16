export type Task = {
    id: string
    name: string
    description?: string
    status: 'todo' | 'in_progress' | 'done'
    categories?: ('home' | 'work' | 'holiday')[]
    createdAt: number
    updatedAt: number | null
    fetchedAt?: number
    isCachedFromTheList?: boolean
}
