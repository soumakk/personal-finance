import { Route, Routes } from 'react-router'
import Dashboard from './modules/dashboard/Dashboard'
import Transactions from './modules/transactions/Transactions'

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/transactions" element={<Transactions />} />
			</Routes>
		</>
	)
}

export default App
