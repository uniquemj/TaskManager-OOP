import {z} from 'zod'
import { Status } from '../models/task.model'

export const taskSchema = z.object({
    title: z.string(),
    description: z.string().max(150).optional(),
    status: z.nativeEnum(Status).optional(),
    due_date: z.string().date()
})

export const updateTaskSchema = z.object({
    title: z.string().optional(),
    description: z.string().max(150).optional(),
    status: z.nativeEnum(Status).optional(),
    due_date: z.string().date().optional()
})

