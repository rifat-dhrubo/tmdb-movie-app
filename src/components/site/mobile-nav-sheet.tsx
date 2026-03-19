import { Link } from '@tanstack/react-router';
import React from 'react';

import { SiteLogo } from './site-logo';

import { Icon } from '@/components/icon';
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
				<Icon className="size-5" name="list_bold" />
			</SheetTrigger>
			<SheetContent side="right">
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
