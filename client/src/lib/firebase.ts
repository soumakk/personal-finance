// firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// firebase-config.ts
export const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Export auth service
export const auth = getAuth(app)
