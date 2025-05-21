import { auth } from '@/lib/firebase'

export const API_URL = `${import.meta.env.VITE_SERVER_URL}/api`

export async function authFetch<T>(url: string, options: RequestInit = {}) {
	const user = auth.currentUser

	if (!user) {
		throw new Error('User not authenticated')
	}

	const token = await user.getIdToken()

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
		...options.headers,
	}

	return fetch(`${API_URL}${url}`, {
		...options,
		headers,
	}).then(async (response) => {
		if (!response.ok) {
			const errorData = await response.json().catch(() => null)
			throw new Error(errorData?.error || `Request failed with status ${response.status}`)
		}
		return response.json() as T
	})
}
