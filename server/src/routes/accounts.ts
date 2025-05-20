import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { PrismaClient } from '@prisma/client'
import { accountSchema, accountUpdateSchema } from '../schemas/account'
import { HTTPException } from 'hono/http-exception'

const prisma = new PrismaClient()
const accounts = new Hono()

// CREATE
accounts.post('/', zValidator('json', accountSchema), async (c) => {
	try {
		const data = c.req.valid('json')
		const exists = await prisma.account.findFirst({
			where: { userId: data.userId, name: data.name },
		})
		if (exists) {
			return c.json({ error: 'Account with this name already exists.' }, 409)
		}
		const account = await prisma.account.create({ data })
		return c.json(account, 201)
	} catch (err) {
		throw new HTTPException(500, { message: 'Internal server error' })
	}
})

// READ ALL (optionally filter by userId)
accounts.get('/', async (c) => {
	try {
		const { userId } = c.req.query()
		const where = userId ? { userId } : {}
		const all = await prisma.account.findMany({
			where,
			orderBy: { name: 'asc' },
		})
		return c.json(all)
	} catch (err) {
		throw new HTTPException(500, { message: 'Internal server error' })
	}
})

// READ ONE
accounts.get('/:id', async (c) => {
	try {
		const id = c.req.param('id')
		const account = await prisma.account.findUnique({ where: { id } })
		if (!account) return c.json({ error: 'Account not found.' }, 404)
		return c.json(account)
	} catch (err) {
		throw new HTTPException(500, { message: 'Internal server error' })
	}
})

// UPDATE
accounts.put('/:id', zValidator('json', accountUpdateSchema), async (c) => {
	try {
		const id = c.req.param('id')
		const data = c.req.valid('json')
		const updated = await prisma.account.update({ where: { id }, data })
		return c.json(updated)
	} catch (err: any) {
		if (err.code === 'P2025') {
			throw new HTTPException(404, { message: 'Account not found' })
		}
		throw new HTTPException(500, { message: 'Internal server error' })
	}
})

// DELETE
accounts.delete('/:id', async (c) => {
	try {
		const id = c.req.param('id')
		await prisma.account.delete({ where: { id } })
		return c.json({ message: 'Account deleted.' })
	} catch (err: any) {
		if (err.code === 'P2025') {
			throw new HTTPException(404, { message: 'Account not found' })
		}
		console.error(err)
		throw new HTTPException(500, { message: 'Internal server error' })
	}
})

export default accounts
