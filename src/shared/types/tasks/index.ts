export type TaskCategory = 'home' | 'work' | 'holiday'

export type Task = {
    id: string
    name: string
    description?: string
    status: 'todo' | 'in_progress' | 'done'
    categories?: TaskCategory[]
    createdAt: number
    updatedAt: number | null
    fetchedAt?: number
    isCachedFromTheList?: boolean
    isCachedFromOptimisticUpdate?: boolean
}

export type DbTaskItemValue = Omit<Task, 'id'>

export type DbTasks = Map<string, DbTaskItemValue>
