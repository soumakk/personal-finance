export function getAuthErrorMessage(error: any): string {
	// Get the error code, fallback to empty string if missing
	const code = error?.code || ''

	switch (code) {
		case 'auth/email-already-in-use':
		case 'auth/email-already-exists':
			return 'This email address is already in use. Try signing in or use a different email.'

		case 'auth/invalid-email':
			return 'Please enter a valid email address.'

		case 'auth/user-not-found':
			return 'No account found with this email. Please check and try again.'

		case 'auth/wrong-password':
			return 'Incorrect password. Please try again or use "Forgot password".'

		case 'auth/popup-closed-by-user':
			return 'The sign-in popup was closed before completing. Please try again.'

		case 'auth/popup-blocked':
			return 'The sign-in popup was blocked by your browser. Please allow popups and try again.'

		case 'auth/account-exists-with-different-credential':
			return 'An account already exists with the same email but different sign-in credentials. Try signing in with Google or another provider.'

		case 'auth/credential-already-in-use':
			return 'This credential is already associated with a different user account.'

		case 'auth/weak-password':
			return 'Your password is too weak. Please use at least 6 characters.'

		case 'auth/missing-email':
			return 'Please enter your email address.'

		case 'auth/invalid-credential':
			return 'The credentials are invalid. Please try again.'

		case 'auth/missing-password':
			return 'Please enter your password.'

		case 'auth/too-many-requests':
			return 'Too many attempts. Please wait and try again later.'

		case 'auth/user-disabled':
			return 'This account has been disabled. Please contact support.'

		case 'auth/invalid-action-code':
			return 'The verification link is invalid or expired. Please request a new one.'

		case 'auth/expired-action-code':
			return 'The verification link has expired. Please request a new one.'

		default:
			// Fallback to Firebase's own message or a generic one
			return error?.message || 'An unexpected error occurred. Please try again.'
	}
}

export function getErrorMessage(error: unknown): string {
	// Handle Error objects
	if (error instanceof Error) {
		return error.message
	}

	// Handle string errors
	if (typeof error === 'string') {
		return error
	}

	// Handle API error responses (e.g., { error: 'msg' } or { message: 'msg' })
	if (typeof error === 'object' && error !== null) {
		if ('error' in error && typeof (error as any).error === 'string') {
			return (error as any).error
		}
		if ('message' in error && typeof (error as any).message === 'string') {
			return (error as any).message
		}
		// Handle Zod validation errors (array of issues)
		if ('issues' in error && Array.isArray((error as any).issues)) {
			return (error as any).issues.map((issue: any) => issue.message).join(', ')
		}
	}

	// Fallback message
	return 'An unexpected error occurred. Please try again.'
}
