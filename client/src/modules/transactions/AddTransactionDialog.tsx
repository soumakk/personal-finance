import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Select from '@/components/widgets/Select'
import { useAuth } from '@/contexts/AuthContext'
import { useAccounts, useCategories } from '@/services/queries'
import { addTransaction } from '@/services/transaction.api'
import { TransactionType } from '@/types/transaction.types'
import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'

const transactionTypeOptions = [
	{
		label: 'Income',
		value: TransactionType.INCOME,
	},
	{
		label: 'Expense',
		value: TransactionType.EXPENSE,
	},
]

export default function AddTransactionDialog({
	open,
	onClose,
}: {
	open: boolean
	onClose: () => void
}) {
	const { data: accounts } = useAccounts()
	const { data: categories } = useCategories()
	const { currentUser } = useAuth()
	const queryClient = useQueryClient()

	const form = useForm({
		defaultValues: {
			amount: '',
			description: '',
			date: '',
			type: 'INCOME',
			accountId: '',
			categoryId: '',
		},
		onSubmit: async ({ value }) => {
			await addTransaction({
				accountId: value.accountId,
				amount: value.amount ? parseInt(value.amount) : 0,
				categoryId: value.categoryId,
				date: value.date,
				type: value?.type as TransactionType,
				description: value.description,
				userId: currentUser.id,
			})
			queryClient.invalidateQueries({ queryKey: ['transactions'] })
			onClose()
		},
	})

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Transaction</DialogTitle>
				</DialogHeader>

				<form
					onSubmit={(e) => {
						e.stopPropagation()
						e.preventDefault()
						form.handleSubmit()
					}}
					className="space-y-8 mt-4"
				>
					<div className="grid gap-6">
						<form.Field name="type">
							{(field) => {
								return (
									<div className="grid gap-2">
										<Label htmlFor={field.name}>Transaction Type</Label>
										<Select
											options={transactionTypeOptions}
											id={field.name}
											value={field.state.value}
											onChange={(date) => field.handleChange(date)}
										/>
									</div>
								)
							}}
						</form.Field>

						<form.Field name="accountId">
							{(field) => {
								return (
									<div className="grid gap-2">
										<Label htmlFor={field.name}>Account</Label>
										<Select
											options={accounts?.map((acc) => ({
												label: acc.name,
												value: acc.id,
											}))}
											id={field.name}
											value={field.state.value}
											onChange={(date) => field.handleChange(date)}
										/>
									</div>
								)
							}}
						</form.Field>

						<form.Field name="categoryId">
							{(field) => {
								return (
									<div className="grid gap-2">
										<Label htmlFor={field.name}>Category</Label>
										<Select
											options={categories?.map((acc) => ({
												label: acc.name,
												value: acc.id,
											}))}
											id={field.name}
											value={field.state.value}
											onChange={(date) => field.handleChange(date)}
										/>
									</div>
								)
							}}
						</form.Field>

						<form.Field name="amount">
							{(field) => {
								return (
									<div className="grid gap-2">
										<Label htmlFor={field.name}>Amount</Label>
										<Input
											type="number"
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
										/>
									</div>
								)
							}}
						</form.Field>

						<form.Field name="date">
							{(field) => {
								return (
									<div className="grid gap-2">
										<Label htmlFor={field.name}>Transaction Date</Label>
										<DatePicker
											id={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(date) => field.handleChange(date)}
										/>
									</div>
								)
							}}
						</form.Field>

						<form.Field name="description">
							{(field) => {
								return (
									<div className="grid gap-2">
										<Label htmlFor={field.name}>Description</Label>
										<Input
											type="text"
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
										/>
									</div>
								)
							}}
						</form.Field>
					</div>

					<DialogFooter>
						<Button type="button" variant="secondary" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">Confirm</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
