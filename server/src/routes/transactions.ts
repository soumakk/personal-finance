// src/routes/transactions.ts
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { PrismaClient } from '@prisma/client'
import { transactionSchema, transactionUpdateSchema } from '../schemas/transaction'
import { HTTPException } from 'hono/http-exception'

const prisma = new PrismaClient()
const app = new Hono()

// CREATE
app.post('/', zValidator('json', transactionSchema), async (c) => {
	try {
		const data = c.req.valid('json')
		const transaction = await prisma.transaction.create({ data })
		return c.json(transaction, 201)
	} catch (err) {
		throw new HTTPException(500, { message: 'Internal server error' })
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
			include: {
				account: true,
				category: true,
			},
		})
		return c.json(all)
	} catch (err) {
		throw new HTTPException(500, { message: 'Internal server error' })
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
		throw new HTTPException(500, { message: 'Internal server error' })
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
			throw new HTTPException(404, { message: 'Account not found' })
		}
		throw new HTTPException(500, { message: 'Internal server error' })
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
			throw new HTTPException(404, { message: 'Account not found' })
		}
		throw new HTTPException(500, { message: 'Internal server error' })
	}
})

export default app
