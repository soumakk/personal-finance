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

export default function Transactions() {
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const { data: transactions, isLoading } = useTransactions()
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
					<h3 className="text-4xl font-bold">
						{formatPrice(summary?.totalBalance ?? 0)}
					</h3>

					<figure className="absolute top-4 right-4">
						<img src={moneyIcon} alt="money" />
					</figure>
				</div>

				<div className="border rounded-xl p-7 relative">
					<p className="text-lg text-muted-foreground mb-3">Income</p>
					<h3 className="text-4xl font-bold">{formatPrice(summary?.totalIncome ?? 0)}</h3>

					<figure className="absolute top-4 right-4">
						<img src={incomeIcon} alt="money" />
					</figure>
				</div>

				<div className="border rounded-xl p-7 relative">
					<p className="text-lg text-muted-foreground mb-3">Expense</p>
					<h3 className="text-4xl font-bold">
						{formatPrice(summary?.totalExpense ?? 0)}
					</h3>

					<figure className="absolute top-4 right-4">
						<img src={expenseIcon} alt="money" />
					</figure>
				</div>
			</div>

			<br />
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="">Category</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Method</TableHead>
							<TableHead className="text-right">Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{transactions?.map((transaction) => (
							<TableRow key={transaction.id}>
								<TableCell className="font-medium">
									{transaction.category.name}
								</TableCell>
								<TableCell>{transaction.type}</TableCell>
								<TableCell>
									{dayjs(transaction.date).format('DD/MM/YYYY')}
								</TableCell>
								<TableCell>{transaction.account.name}</TableCell>
								<TableCell className="text-right">{transaction.amount}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<AddTransactionDialog
				open={isAddDialogOpen}
				onClose={() => setIsAddDialogOpen(false)}
			/>
		</DashboardLayout>
	)
}
