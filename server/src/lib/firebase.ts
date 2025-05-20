// src/config/firebase-admin.ts
import { initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const serviceAccountPath = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)

// Initialize Firebase Admin
const app = initializeApp({
	credential: cert(serviceAccountPath),
})

// Export the auth service
export const auth = getAuth(app)
