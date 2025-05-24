import { Hono } from 'hono'
import categories from './routes/categories'
import accounts from './routes/accounts'
import auth from './routes/auth'
import transactions from './routes/transactions'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { rateLimiter } from 'hono-rate-limiter'

const app = new Hono()

app.use('*', logger())

app.use(
	'*',
	cors({
		origin: [
			process.env.CLIENT_URL,
			'https://simple-finance-app.netlify.app',
			'http://localhost:5173',
		],
		allowHeaders: ['Content-Type', 'Authorization'],
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	})
)

app.use(
	'*',
	rateLimiter({
		windowMs: 15 * 60 * 1000, // 15 minutes // counter will reset after 15min
		limit: 1000, // Max 100 requests per window // 100 req per 15 min
		keyGenerator: (c) => c.req.header('x-forwarded-for') || 'global',
		message: 'Too many requests, please try again later.',
	})
)

app.get('/', (c) => {
	return c.json({ msg: 'Welcome to the API for personal finance app' })
})
app.route('/api', auth)
app.route('/api/categories', categories)
app.route('/api/accounts', accounts)
app.route('/api/transactions', transactions)

export default {
	port: process.env.PORT || 8080,
	fetch: app.fetch,
}
