import DashboardLayout from '../layout/DashboardLayout'
import moneyIcon from '../../assets/money.svg'
import expenseIcon from '../../assets/expense.svg'
import incomeIcon from '../../assets/income.svg'

export default function Dashboard() {
	return (
		<DashboardLayout title="Dashboard">
			<div className="grid grid-cols-3 gap-4">
				<div className="border rounded-xl p-7 relative">
					<p className="text-lg text-muted-foreground mb-3">Total Balance</p>
					<h3 className="text-4xl font-bold">₹50,000</h3>

					<figure className="absolute top-4 right-4">
						<img src={moneyIcon} alt="money" />
					</figure>
				</div>

				<div className="border rounded-xl p-7 relative">
					<p className="text-lg text-muted-foreground mb-3">Income</p>
					<h3 className="text-4xl font-bold">₹50,000</h3>

					<figure className="absolute top-4 right-4">
						<img src={incomeIcon} alt="money" />
					</figure>
				</div>

				<div className="border rounded-xl p-7 relative">
					<p className="text-lg text-muted-foreground mb-3">Expense</p>
					<h3 className="text-4xl font-bold">₹50,000</h3>

					<figure className="absolute top-4 right-4">
						<img src={expenseIcon} alt="money" />
					</figure>
				</div>
			</div>
		</DashboardLayout>
	)
}
