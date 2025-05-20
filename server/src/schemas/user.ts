import { z } from 'zod'

export const signupUserSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	uid: z.string().min(1, 'UID is required'),
})
