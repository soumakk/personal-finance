import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useState } from 'react'
import DashboardLayout from '../layout/DashboardLayout'
import AddTransactionDialog from './AddTransactionDialog'
import { useSummary, useTransactions } from '@/services/queries'
import dayjs from 'dayjs'
import expenseIcon from '../../assets/expense.svg'
import incomeIcon from '../../assets/income.svg'
import moneyIcon from '../../assets/money.svg'
import { formatPrice } from '@/lib/utils'
import { Loader } from 'lucide-react'

export default function Transactions() {
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const { data: transactions, isLoading: isTransactionsLoading } = useTransactions()
	const { data: summary } = useSummary()
	console.log(summary)

	return (
		<DashboardLayout
			title="Transactions"
			action={
				<Button size="lg" onClick={() => setIsAddDialogOpen(true)}>
					Add Transaction
				</Button>
			}
		>
			<div className="grid grid-cols-3 gap-4">
				<div className="border rounded-xl p-7 relative">
					<p className="text-lg text-muted-foreground mb-3">Total Balance</p>
					<h3 className="text-4xl font-bold text-primary">
						{formatPrice(summary?.totalBalance ?? 0)}
					</h3>

					<figure className="absolute top-4 right-4">
						<img src={moneyIcon} alt="money" />
					</figure>
				</div>

				<div className="border rounded-xl p-7 relative">
					<p className="text-lg text-muted-foreground mb-3">Income</p>
					<h3 className="text-4xl font-bold text-green-500">
						{formatPrice(summary?.totalIncome ?? 0)}
					</h3>

					<figure className="absolute top-4 right-4">
						<img src={incomeIcon} alt="money" />
					</figure>
				</div>

				<div className="border rounded-xl p-7 relative">
					<p className="text-lg text-muted-foreground mb-3">Expense</p>
					<h3 className="text-4xl font-bold text-red-500">
						{formatPrice(summary?.totalExpense ?? 0)}
					</h3>

					<figure className="absolute top-4 right-4">
						<img src={expenseIcon} alt="money" />
					</figure>
				</div>
			</div>

			<br />
			<div className="">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="">Date</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Notes</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Account</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{transactions?.length === 0 ? (
							<TableRow>
								<TableCell
									className="text-center py-20 pointer-events-none"
									colSpan={6}
								>
									No transactions found
								</TableCell>
							</TableRow>
						) : (
							transactions?.map((transaction) => (
								<TableRow key={transaction.id}>
									<TableCell className="font-medium">
										{dayjs(transaction.date).format('MMM DD, YYYY')}
									</TableCell>
									<TableCell>{transaction.category.name}</TableCell>
									<TableCell>{transaction.description}</TableCell>
									<TableCell>{formatPrice(transaction.amount)}</TableCell>
									<TableCell>{transaction.type}</TableCell>
									<TableCell>{transaction.account.name}</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{isAddDialogOpen && (
				<AddTransactionDialog
					open={isAddDialogOpen}
					onClose={() => setIsAddDialogOpen(false)}
				/>
			)}
		</DashboardLayout>
	)
}
