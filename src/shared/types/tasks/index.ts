import { z } from 'zod'

// const TaskCategorySchema = z.union([
//     z.literal('home'),
//     z.literal('work'),
//     z.literal('holiday'),
// ])
const TaskCategorySchema = z.enum(['home', 'work', 'holiday'])

export type TaskCategory = z.infer<typeof TaskCategorySchema>

const TaskCategoriesSchema = z.array(TaskCategorySchema)

const TaskStatusSchema = z.enum(['todo', 'in_progress', 'done'])

const TaskUpdatedAtSchema = z.union([z.number(), z.null()])

const TaskRequiredSchema = z.object({
    id: z.string().min(1),
    name: z.string().transform((it) => it.trim()),
    status: TaskStatusSchema,
    createdAt: z.number(),
    updatedAt: TaskUpdatedAtSchema,
})

const TaskOptionalSchema = z.object({
    categories: TaskCategoriesSchema,
    description: z.string(),
    fetchedAt: z.number(),
    isCachedFromOptimisticUpdate: z.boolean(),
    isCachedFromTheList: z.boolean(),
}).partial()

// const TaskSchema = TaskRequiredSchema.extend({ ... })
export const TaskSchema = TaskRequiredSchema.merge(TaskOptionalSchema)

export type Task = z.infer<typeof TaskSchema> // OUTPUT
// export type Task = z.input<typeof TaskSchema> // INPUT

export type DbTaskItemValue = Omit<Task, 'id'>

export type DbTasks = Map<string, DbTaskItemValue>
