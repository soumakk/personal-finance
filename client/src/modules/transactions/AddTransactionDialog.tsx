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
import { Textarea } from '@/components/ui/textarea'
import Select from '@/components/widgets/Select'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'
import { useAccounts, useCategories } from '@/services/queries'
import { addTransaction } from '@/services/transaction.api'
import { TransactionType } from '@/types/transaction.types'
import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'

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
			date: dayjs().toISOString(),
			type: TransactionType.EXPENSE,
			accountId: accounts?.[0]?.id,
			categoryId: categories?.[0]?.id,
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
			queryClient.invalidateQueries({ queryKey: ['summary'] })
			onClose()
		},
	})

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				{/* <DialogHeader>
					<DialogTitle>New Transaction</DialogTitle>
				</DialogHeader> */}

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
								function toggleType() {
									field.handleChange(
										field.state.value === TransactionType.EXPENSE
											? TransactionType.INCOME
											: TransactionType.EXPENSE
									)
								}
								return (
									<div className="flex justify-center">
										<div className="inline-flex items-center border rounded-full">
											<button
												className={cn(
													'min-w-[40px] h-11 px-10 rounded-full cursor-pointer',
													{
														'bg-primary text-primary-foreground':
															field.state.value ===
															TransactionType.EXPENSE,
													}
												)}
												onClick={toggleType}
												type="button"
											>
												Expense
											</button>
											<button
												className={cn(
													'min-w-[40px] h-11 px-10 rounded-full cursor-pointer',
													{
														'bg-primary text-primary-foreground':
															field.state.value ===
															TransactionType.INCOME,
													}
												)}
												onClick={toggleType}
												type="button"
											>
												Income
											</button>
										</div>
									</div>
								)
							}}
						</form.Field>

						<div className="grid grid-cols-2 gap-5">
							<form.Field name="amount">
								{(field) => {
									return (
										<div className="grid gap-2">
											<Label htmlFor={field.name}>Amount</Label>
											<Input
												autoFocus
												type="number"
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="Amount"
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
						</div>

						<div className="grid grid-cols-2 gap-5">
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
												options={categories
													// ?.filter((cat) => transactionType === cat.type)
													?.map((cat) => ({
														label: cat.name,
														value: cat.id,
														icon: cat.icon,
													}))}
												id={field.name}
												value={field.state.value}
												onChange={(date) => field.handleChange(date)}
											/>
										</div>
									)
								}}
							</form.Field>
						</div>

						<form.Field name="description">
							{(field) => {
								return (
									<div className="grid gap-2">
										<Label htmlFor={field.name}>Notes</Label>
										<Textarea
											rows={3}
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
						<Button
							size="lg"
							className="flex-1 w-full"
							type="button"
							variant="outline"
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button size="lg" className="flex-1 w-full" type="submit">
							Confirm
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
