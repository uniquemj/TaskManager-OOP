import {z} from 'zod'


export const registerUserSchema = z.object({
    fullname: z.string().max(100),
    email: z.string().email(),
    password: z.string().min(8)
})

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})