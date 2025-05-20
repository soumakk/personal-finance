import { useAuth } from '@/contexts/AuthContext'
import { Navigate, Outlet } from 'react-router'

export default function AuthRoutes() {
	const { currentUser, loading } = useAuth()

	if (loading) {
		return <div>Loading...</div>
	}

	return currentUser ? <Navigate to="/" replace /> : <Outlet />
}
