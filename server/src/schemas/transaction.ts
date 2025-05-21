import { z } from 'zod'

export const transactionSchema = z.object({
	amount: z.number().finite().min(0.01),
	description: z.string().optional(),
	date: z.string().datetime(),
	type: z.enum(['INCOME', 'EXPENSE']),
	userId: z.string().uuid(),
	accountId: z.string().uuid(),
	categoryId: z.string().uuid().optional(),
})

export const transactionUpdateSchema = transactionSchema.partial()
