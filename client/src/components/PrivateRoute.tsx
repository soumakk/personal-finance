import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { Loader } from 'lucide-react'

export const PrivateRoute = () => {
	const { currentUser, loading } = useAuth()

	if (loading) {
		return (
			<div className="h-dvh w-full grid place-content-center">
				<Loader className="h-5 w-5 animate-spin" />
			</div>
		)
	}

	return currentUser ? <Outlet /> : <Navigate to="/login" replace />
}
