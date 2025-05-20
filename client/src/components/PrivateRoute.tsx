import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export const PrivateRoute = () => {
	const { currentUser, loading } = useAuth()

	if (loading) {
		return <div>Loading...</div>
	}

	return currentUser ? <Outlet /> : <Navigate to="/login" replace />
}
