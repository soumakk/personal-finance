import type { Account, Category, Transaction } from './transaction.types'

export type User = {
	id: string
	email: string
	uid: string
	name: string
	accounts?: Account[]
	categories?: Category[]
	transactions?: Transaction[]
	createdAt: string // ISO date string
	updatedAt: string // ISO date string
}
