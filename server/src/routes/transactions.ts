// src/routes/transactions.ts
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { PrismaClient } from '@prisma/client'
import { transactionSchema, transactionUpdateSchema } from '../schemas/transaction'

const prisma = new PrismaClient()
const app = new Hono()

// CREATE
app.post('/', zValidator('json', transactionSchema), async (c) => {
	try {
		const data = c.req.valid('json')
		const transaction = await prisma.transaction.create({ data })
		return c.json(transaction, 201)
	} catch (err) {
		console.error(err)
		return c.json({ error: 'Failed to create transaction.' }, 500)
	}
})

// READ ALL (optionally filter by userId, accountId, categoryId)
app.get('/', async (c) => {
	try {
		const { userId, accountId, categoryId } = c.req.query()
		const where: any = {}
		if (userId) where.userId = userId
		if (accountId) where.accountId = accountId
		if (categoryId) where.categoryId = categoryId

		const all = await prisma.transaction.findMany({
			where,
			orderBy: { date: 'desc' },
		})
		return c.json(all)
	} catch (err) {
		console.error(err)
		return c.json({ error: 'Failed to fetch transactions.' }, 500)
	}
})

// READ ONE
app.get('/:id', async (c) => {
	try {
		const id = c.req.param('id')
		const transaction = await prisma.transaction.findUnique({ where: { id } })
		if (!transaction) return c.json({ error: 'Transaction not found.' }, 404)
		return c.json(transaction)
	} catch (err) {
		console.error(err)
		return c.json({ error: 'Failed to fetch transaction.' }, 500)
	}
})

// UPDATE
app.put('/:id', zValidator('json', transactionUpdateSchema), async (c) => {
	try {
		const id = c.req.param('id')
		const data = c.req.valid('json')
		const updated = await prisma.transaction.update({ where: { id }, data })
		return c.json(updated)
	} catch (err: any) {
		if (err.code === 'P2025') {
			return c.json({ error: 'Transaction not found.' }, 404)
		}
		console.error(err)
		return c.json({ error: 'Failed to update transaction.' }, 500)
	}
})

// DELETE
app.delete('/:id', async (c) => {
	try {
		const id = c.req.param('id')
		await prisma.transaction.delete({ where: { id } })
		return c.json({ message: 'Transaction deleted.' })
	} catch (err: any) {
		if (err.code === 'P2025') {
			return c.json({ error: 'Transaction not found.' }, 404)
		}
		console.error(err)
		return c.json({ error: 'Failed to delete transaction.' }, 500)
	}
})

export default app
