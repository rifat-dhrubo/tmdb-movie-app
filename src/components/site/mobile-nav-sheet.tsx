import { Link } from '@tanstack/react-router';
import React from 'react';

import { SiteLogo } from './site-logo';

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { useAuth } from '@/features/auth';

export function MobileNavSheet() {
	const { logout, user } = useAuth();
	const [open, setOpen] = React.useState(false);

	const handleLogout = () => {
		void logout();
		setOpen(false);
	};

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger className="motion-pressable flex size-10 items-center justify-center rounded-md hover:bg-muted lg:hidden">
				<svg
					className="size-5"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					viewBox="0 0 24 24"
				>
					<path
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</SheetTrigger>
			<SheetContent className="w-[300px] border-border/40" side="right">
				<SheetHeader>
					<SheetTitle>
						<SiteLogo />
					</SheetTitle>
				</SheetHeader>
				<nav className="mt-8 flex flex-col gap-6">
					<Link
						className="text-lg font-medium transition-colors hover:text-primary"
						to="/search"
						onClick={() => setOpen(false)}
					>
						Search
					</Link>
					<Link
						className="text-lg font-medium transition-colors hover:text-primary"
						to="/watchlist"
						onClick={() => setOpen(false)}
					>
						Watchlist
					</Link>

					<div className="flex flex-col gap-4 pt-6">
						{user ? (
							<button
								className="motion-pressable text-left text-lg font-medium transition-colors hover:text-primary"
								type="button"
								onClick={handleLogout}
							>
								Sign out
							</button>
						) : (
							<>
								<Link
									className="text-lg font-medium transition-colors hover:text-primary"
									to="/sign-in"
									onClick={() => setOpen(false)}
								>
									Sign in
								</Link>
								<Link
									className="text-lg font-medium transition-colors hover:text-primary"
									to="/sign-up"
									onClick={() => setOpen(false)}
								>
									Create account
								</Link>
							</>
						)}
					</div>
				</nav>
			</SheetContent>
		</Sheet>
	);
}
