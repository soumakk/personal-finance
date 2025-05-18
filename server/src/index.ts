import { Hono } from 'hono'
import categories from './routes/categories'
import accounts from './routes/accounts'
import transactions from './routes/transactions'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { rateLimiter } from 'hono-rate-limiter'

const app = new Hono()

app.use('*', logger())

app.use(
	'*',
	cors({
		origin: ['http://localhost:5173'], // Your frontend URL
		allowHeaders: ['Content-Type', 'Authorization'],
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	})
)

app.use(
	'*',
	rateLimiter({
		windowMs: 15 * 60 * 1000, // 15 minutes // counter will reset after 15min
		limit: 100, // Max 100 requests per window // 100 req per 15 min
		keyGenerator: (c) => c.req.header('x-forwarded-for') || 'global',
		message: 'Too many requests, please try again later.',
	})
)

app.route('/categories', categories)
app.route('/accounts', accounts)
app.route('/transactions', transactions)

export default app
