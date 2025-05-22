import { useQuery } from '@tanstack/react-query'
import { fetchAccounts, fetchCategories, fetchSummary, fetchTransactions } from './transaction.api'

export function useAccounts() {
	return useQuery({
		queryKey: ['accounts'],
		queryFn: fetchAccounts,
	})
}

export function useCategories() {
	return useQuery({
		queryKey: ['categories'],
		queryFn: fetchCategories,
	})
}

export function useTransactions() {
	return useQuery({
		queryKey: ['transactions'],
		queryFn: fetchTransactions,
	})
}

export function useSummary() {
	return useQuery({
		queryKey: ['summary'],
		queryFn: fetchSummary,
	})
}
