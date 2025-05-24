import { Link } from 'react-router'
import reactLogo from '../../assets/logo.svg'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, User } from 'lucide-react'

export default function Header() {
	const { logout } = useAuth()
	return (
		<header className="w-full px-5 bg-card shadow-sm">
			<div className="flex items-center justify-between gap-10 py-2">
				<a href="/">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>

				<nav className="font-medium text-sm">
					{/* <ul className="flex items-center gap-5">
						<li>
							<Link to="/">Dashboard</Link>
						</li>
						<li>
							<Link to="/transactions">Transactions</Link>
						</li>
					</ul> */}
				</nav>

				<div className="flex items-center gap-3">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Avatar className="cursor-pointer select-none">
								<AvatarFallback>S</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<User />
								View profile
							</DropdownMenuItem>
							<DropdownMenuItem onClick={logout}>
								<LogOut />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	)
}
