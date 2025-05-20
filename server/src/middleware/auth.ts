// src/middleware/auth.ts
import { Context, Next } from 'hono'
import { auth } from '../lib/firebase'

export const authMiddleware = async (c: Context, next: Next) => {
	try {
		const authHeader = c.req.header('Authorization')

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return c.json({ error: 'Unauthorized - No token provided' }, 401)
		}

		const token = authHeader.split(' ')[1]

		try {
			const decodedToken = await auth.verifyIdToken(token)

			// Check token expiration (Firebase handles this but double-checking)
			const now = Math.floor(Date.now() / 1000)
			if (decodedToken.exp < now) {
				return c.json({ error: 'Token expired' }, 401)
			}

			c.set('user', decodedToken)
			await next()
		} catch (error) {
			if (error.code === 'auth/id-token-expired') {
				return c.json({ error: 'Token expired' }, 401)
			} else if (error.code === 'auth/id-token-revoked') {
				return c.json({ error: 'Token revoked' }, 401)
			}

			return c.json({ error: 'Invalid authentication' }, 401)
		}
	} catch (error) {
		console.error('Auth middleware error:', error)
		return c.json({ error: 'Internal Server Error' }, 500)
	}
}
