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

			<section className="max-w-5xl mx-auto my-6 bg-card rounded-2xl p-8">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-semibold">{title}</h2>

					{action}
				</div>

				<div className="my-6">{children}</div>
			</section>
		</div>
	)
}
