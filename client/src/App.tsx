import { Route, Routes } from 'react-router'
import Dashboard from './modules/dashboard/Dashboard'
import Transactions from './modules/transactions/Transactions'
import Login from './modules/login/Login'
import Signup from './modules/login/Signup'
import { AuthProvider } from './contexts/AuthContext'
import { PrivateRoute } from './components/PrivateRoute'
import AuthRoutes from './components/AuthRoutes'

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route element={<AuthRoutes />}>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Route>

				<Route element={<PrivateRoute />}>
					<Route path="/" element={<Transactions />} />
					{/* <Route path="/transactions" element={<Transactions />} /> */}
				</Route>
			</Routes>
		</AuthProvider>
	)
}

export default App
