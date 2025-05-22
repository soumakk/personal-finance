import { Link } from 'react-router'
import reactLogo from '../../assets/logo.svg'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
	const { logout } = useAuth()
	return (
		<header className="max-w-5xl mx-auto px-3">
			<div className="flex items-center gap-10 py-5">
				<a href="/">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>

				<nav className="flex-1">
					{/* <ul className="flex items-center gap-4">
						<li>
							<Link to="/">Dashboard</Link>
						</li>
						<li>
							<Link to="/transactions">Transactions</Link>
						</li>
					</ul> */}
				</nav>

				<div className="flex items-center gap-3">
					<Button variant="ghost" onClick={logout}>
						Logout
					</Button>
					<Avatar>
						<AvatarFallback>S</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</header>
	)
}
