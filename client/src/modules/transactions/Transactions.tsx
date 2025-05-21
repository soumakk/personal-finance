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
import { useTransactions } from '@/services/queries'
import dayjs from 'dayjs'

export default function Transactions() {
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const { data: transactions, isLoading } = useTransactions()

	return (
		<DashboardLayout
			title="Transactions"
			action={
				<Button size="lg" onClick={() => setIsAddDialogOpen(true)}>
					Add Transaction
				</Button>
			}
		>
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
						<TableRow>
							<TableCell className="font-medium">
								{transaction.category.name}
							</TableCell>
							<TableCell>{transaction.type}</TableCell>
							<TableCell>{dayjs(transaction.date).format('DD/MM/YYYY')}</TableCell>
							<TableCell>{transaction.account.name}</TableCell>
							<TableCell className="text-right">{transaction.amount}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<AddTransactionDialog
				open={isAddDialogOpen}
				onClose={() => setIsAddDialogOpen(false)}
			/>
		</DashboardLayout>
	)
}
