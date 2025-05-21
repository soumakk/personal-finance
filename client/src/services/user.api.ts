import type { User } from '@/types/user.types'
import { API_URL, authFetch } from './api'

export function signupUser(body: { email: string; uid: string; name: string }) {
	return fetch(`${API_URL}/create-user`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export function fetchUser() {
	return authFetch<User>('/user-profile')
}
