import { auth } from '@/lib/firebase'
import { fetchUser, signupUser } from '@/services/user.api'
import type { User } from '@/types/user.types'
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	type UserCredential,
} from 'firebase/auth'
import { Loader } from 'lucide-react'
import React, { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
	currentUser: User | null
	loading: boolean
	signup: (email: string, password: string, name: string) => Promise<void>
	login: (email: string, password: string) => Promise<UserCredential>
	loginWithGoogle: () => Promise<UserCredential>
	logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
	return useContext(AuthContext) as AuthContextType
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	async function signup(email: string, password: string, name: string) {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password)
		await signupUser({ email, name, uid: userCredential.user.uid })
		return
	}

	function login(email: string, password: string) {
		return signInWithEmailAndPassword(auth, email, password)
	}

	function loginWithGoogle() {
		const provider = new GoogleAuthProvider()
		return signInWithPopup(auth, provider)
	}

	function logout() {
		return signOut(auth)
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setLoading(true)
				fetchUser()
					.then((user) => {
						setCurrentUser(user)
						setLoading(false)
					})
					.catch((err) => {
						setLoading(false)
						setCurrentUser(null)
					})
			} else {
				setLoading(false)
				setCurrentUser(null)
			}
		})

		return unsubscribe
	}, [])

	const value = {
		currentUser,
		loading,
		signup,
		login,
		loginWithGoogle,
		logout,
	}

	return (
		<AuthContext.Provider value={value}>
			{loading ? (
				<div className="h-dvh w-full grid place-content-center">
					<Loader className="h-5 w-5 animate-spin" />
				</div>
			) : (
				children
			)}
		</AuthContext.Provider>
	)
}
