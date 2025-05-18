import React, { type ReactNode } from 'react'
import Header from './Header'

export default function DashboardLayout({
	children,
	action,
	title,
}: {
	title: string
	children: ReactNode
	action?: ReactNode
}) {
	return (
		<div>
			<Header />

			<section className="max-w-5xl mx-auto px-3">
				<div className="flex items-center justify-between">
					<h2 className="text-3xl font-semibold">{title}</h2>

					{action}
				</div>

				<div className="my-6">{children}</div>
			</section>
		</div>
	)
}
