import { Link } from '@tanstack/react-router';
import { Globe, Home, Menu, Network, Table, X } from 'lucide-react';
import React from 'react';

import { HeaderUser } from '../integrations/clerk/header-user.tsx';

export function Header() {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<>
			<header className="p-4 flex items-center bg-gray-800 text-white shadow-lg">
				<button
					aria-label="Open menu"
					className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
					onClick={() => setIsOpen(true)}
				>
					<Menu size={24} />
				</button>
				<h1 className="ml-4 text-xl font-semibold">
					<Link to="/">
						<img
							alt="TanStack Logo"
							className="h-10"
							src="/tanstack-word-logo-white.svg"
						/>
					</Link>
				</h1>
			</header>

			<aside
				className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<div className="flex items-center justify-between p-4 border-b border-gray-700">
					<h2 className="text-xl font-bold">Navigation</h2>
					<button
						aria-label="Close menu"
						className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
						onClick={() => setIsOpen(false)}
					>
						<X size={24} />
					</button>
				</div>

				<nav className="flex-1 p-4 overflow-y-auto">
					<Link
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
						to="/"
						activeProps={{
							className:
								'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
						}}
						onClick={() => setIsOpen(false)}
					>
						<Home size={20} />
						<span className="font-medium">Home</span>
					</Link>

					{/* Demo Links Start */}

					<Link
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
						to="/demo/clerk"
						activeProps={{
							className:
								'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
						}}
						onClick={() => setIsOpen(false)}
					>
						<Globe size={20} />
						<span className="font-medium">Clerk</span>
					</Link>

					<Link
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
						to="/demo/table"
						activeProps={{
							className:
								'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
						}}
						onClick={() => setIsOpen(false)}
					>
						<Table size={20} />
						<span className="font-medium">TanStack Table</span>
					</Link>

					<Link
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
						to="/demo/tanstack-query"
						activeProps={{
							className:
								'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
						}}
						onClick={() => setIsOpen(false)}
					>
						<Network size={20} />
						<span className="font-medium">TanStack Query</span>
					</Link>

					{/* Demo Links End */}
				</nav>

				<div className="p-4 border-t border-gray-700 bg-gray-800 flex flex-col gap-2">
					<HeaderUser />
				</div>
			</aside>
		</>
	);
}
