import { z } from 'zod'

export const accountSchema = z.object({
	name: z.string().min(1),
	type: z.enum(['CHECKING', 'SAVINGS', 'CREDIT_CARD', 'CASH', 'OTHER']),
	balance: z.number().default(0),
	currency: z.string().default('USD'),
	isActive: z.boolean().default(true),
	userId: z.string().uuid(),
})

export const accountUpdateSchema = accountSchema.partial()
