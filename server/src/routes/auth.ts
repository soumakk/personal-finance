import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { PrismaClient } from '@prisma/client'
import { categorySchema, categoryUpdateSchema } from '../schemas/category'
import { authMiddleware } from '../middleware/auth'
import { auth } from '../lib/firebase'
import { signupUserSchema } from '../schemas/user'
import { HTTPException } from 'hono/http-exception'

const prisma = new PrismaClient()
const app = new Hono()

// User verification route
app.post('/verify-token', authMiddleware, async (c) => {
	const user = c.get('user')
	return c.json({ user })
})

// Protected routes
app.get('/user-profile', authMiddleware, async (c) => {
	const user = c.get('user')
	const uid = user.uid

	try {
		const userRecord = await auth.getUser(uid)
		const user = await prisma.user.findFirst({
			where: {
				uid,
			},
		})
		return c.json(user)
	} catch (error: any) {
		console.log(error)
		if (error.code === 'P2021') {
			throw new HTTPException(404, { message: 'Account not found' })
		}
		throw new HTTPException(500, { message: 'Internal server error' })
	}
})

app.post('/create-user', zValidator('json', signupUserSchema), async (c) => {
	try {
		const { name, email, uid } = c.req.valid('json')
		await prisma.user.create({
			data: {
				email,
				name,
				uid,
			},
		})
		return c.json({ success: true })
	} catch (error) {
		console.log(error)
		throw new HTTPException(500, { message: 'Internal server error' })
	}
})

export default app
