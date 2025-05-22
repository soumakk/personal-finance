export type Account = {
	id: string
	name: string
	type: 'CHECKING' | 'SAVINGS' | 'CREDIT' | 'CASH' | 'INVESTMENT'
	balance: number
	currency: string
	isActive: boolean
	userId: string
	transactions: Transaction[]
	createdAt: string // ISO date string
	updatedAt: string // ISO date string
}

export type Category = {
	id: string
	name: string
	icon?: string
	type: TransactionType
	userId: string
	transactions: Transaction[]
	createdAt: string // ISO date string
	updatedAt: string // ISO date string
}

export type Transaction = {
	id: string
	amount: number
	description?: string
	date: string // ISO date string
	type: TransactionType
	userId: string

	accountId: string
	categoryId?: string
	account?: Account
	category?: Category

	createdAt: string // ISO date string
	updatedAt: string // ISO date string
}

export type AddTransactionBody = {
	amount: number
	description?: string
	date: string
	type: TransactionType
	accountId: string
	categoryId: string
	userId?: string
}

export enum TransactionType {
	INCOME = 'INCOME',
	EXPENSE = 'EXPENSE',
}

export interface ISummary {
	totalBalance: number
	totalExpense: number
	totalIncome: number
}
