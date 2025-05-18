import { z } from 'zod'

export const categorySchema = z.object({
	name: z.string().min(1),
	icon: z.string().optional(),
	type: z.enum(['INCOME', 'EXPENSE']),
	userId: z.string().uuid(),
})

export const categoryUpdateSchema = categorySchema.partial()
