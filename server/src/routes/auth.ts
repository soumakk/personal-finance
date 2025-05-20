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
		return c.json({
			displayName: userRecord.displayName,
			email: userRecord.email,
			emailVerified: userRecord.emailVerified,
			photoURL: userRecord.photoURL,
			creationTime: userRecord.metadata.creationTime,
			lastSignInTime: userRecord.metadata.lastSignInTime,
		})
	} catch (error) {
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
		throw new HTTPException(500, { message: 'Internal server error' })
	}
})

export default app
