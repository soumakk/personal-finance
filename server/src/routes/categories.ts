import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { PrismaClient } from '@prisma/client'
import { categorySchema, categoryUpdateSchema } from '../schemas/category'
import { HTTPException } from 'hono/http-exception'

const prisma = new PrismaClient()
const app = new Hono()

// CREATE
app.post('/', zValidator('json', categorySchema), async (c) => {
	try {
		const data = c.req.valid('json')
		const exists = await prisma.category.findFirst({
			where: { userId: data.userId, name: data.name, type: data.type },
		})
		if (exists) {
			return c.json({ error: 'Category already exists.' }, 409)
		}
		const category = await prisma.category.create({ data })
		return c.json(category, 201)
	} catch (err) {
		throw new HTTPException(500, { message: 'Internal server error' })
	}
})

// READ ALL (optionally filter by userId)
app.get('/', async (c) => {
	try {
		const { userId } = c.req.query()
		const where = userId ? { userId } : {}
		const all = await prisma.category.findMany({
			where,
			orderBy: { name: 'asc' },
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
		const category = await prisma.category.findUnique({ where: { id } })
		if (!category) return c.json({ error: 'Category not found.' }, 404)
		return c.json(category)
	} catch (err) {
		throw new HTTPException(500, { message: 'Internal server error' })
	}
})

// UPDATE
app.put('/:id', zValidator('json', categoryUpdateSchema), async (c) => {
	try {
		const id = c.req.param('id')
		const data = c.req.valid('json')
		const updated = await prisma.category.update({ where: { id }, data })
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
		await prisma.category.delete({ where: { id } })
		return c.json({ message: 'Category deleted.' })
	} catch (err: any) {
		if (err.code === 'P2025') {
			throw new HTTPException(404, { message: 'Account not found' })
		}
		throw new HTTPException(500, { message: 'Internal server error' })
	}
})

export default app
