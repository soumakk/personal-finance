import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { getAuthErrorMessage, getErrorMessage } from '@/lib/error'
import { useForm } from '@tanstack/react-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'

export function SignupForm() {
	const navigate = useNavigate()
	const { signup } = useAuth()
	// const [loading, setLoading] = useState(false)

	const form = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
		onSubmit: async ({ value }) => {
			console.log(value)
			try {
				await signup(value.email, value.password, value.name)
				navigate('/')
			} catch (error) {
				console.log(error)
				toast.error(getAuthErrorMessage(error))
			}
		},
	})
	return (
		<form
			onSubmit={(e) => {
				e.stopPropagation()
				e.preventDefault()
				form.handleSubmit()
			}}
		>
			<div className="grid gap-6">
				<div className="grid gap-6">
					<div className="grid gap-2">
						<form.Field name="name">
							{(field) => {
								return (
									<>
										<Label htmlFor={field.name}>Name</Label>
										<Input
											type="text"
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
										/>
									</>
								)
							}}
						</form.Field>
					</div>

					<div className="grid gap-2">
						<form.Field name="email">
							{(field) => {
								return (
									<>
										<Label htmlFor={field.name}>Email</Label>
										<Input
											type="email"
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
										/>
									</>
								)
							}}
						</form.Field>
					</div>
					<div className="grid gap-2">
						<form.Field name="password">
							{(field) => {
								return (
									<>
										<div className="flex items-center">
											<Label htmlFor="password">Password</Label>
											<a
												href="#"
												className="ml-auto text-sm underline-offset-4 hover:underline"
											>
												Forgot your password?
											</a>
										</div>
										<Input
											type="password"
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
										/>
									</>
								)
							}}
						</form.Field>
					</div>
					<Button size="lg" type="submit" className="w-full">
						Login
					</Button>
				</div>
				<div className="text-center text-sm">
					Already have an account?{' '}
					<Link to="/login" className="underline underline-offset-4">
						Login
					</Link>
				</div>
			</div>
		</form>
	)
}
