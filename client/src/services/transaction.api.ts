import type {
	Account,
	AddTransactionBody,
	Category,
	ISummary as Summary,
	Transaction,
} from '@/types/transaction.types'
import { authFetch } from './api'

export function fetchAccounts() {
	return authFetch<Account[]>('/accounts')
}

export function fetchCategories() {
	return authFetch<Category[]>('/categories')
}

export function fetchTransactions() {
	return authFetch<Transaction[]>('/transactions')
}

export function fetchSummary() {
	return authFetch<Summary>('/transactions/summary')
}

export function addTransaction(body: AddTransactionBody) {
	return authFetch('/transactions', {
		method: 'POST',
		body: JSON.stringify(body),
	})
}
