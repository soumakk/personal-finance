import React, { createContext, useContext, useState, useEffect } from 'react'
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
	type User,
	type UserCredential,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { signupUser } from '@/services/user'

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
			setCurrentUser(user)
			setLoading(false)
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

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
