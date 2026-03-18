import { Link } from '@tanstack/react-router';
import React from 'react';

import { MobileNavSheet } from './mobile-nav-sheet';
import { SiteLogo } from './site-logo';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth';

export function SiteHeader() {
	const [scrolled, setScrolled] = React.useState(false);
	const { user } = useAuth();

	React.useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header
			className={`sticky top-0 z-50 transition-colors duration-200 ${
				scrolled
					? 'border-b border-border/40 bg-background/80 backdrop-blur-md'
					: 'border-b border-transparent bg-transparent'
			}`}
		>
			<div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
				{/* Left - Logo */}
				<SiteLogo />

				{/* Center - Desktop nav */}
				<nav className="hidden items-center gap-6 lg:flex">
					<Link
						className="text-sm font-medium transition-colors hover:text-primary"
						to="/search"
					>
						Search
					</Link>
					<Link
						className="text-sm font-medium transition-colors hover:text-primary"
						to="/watchlist"
					>
						Watchlist
					</Link>
				</nav>

				{/* Right - Auth state */}
				<div className="flex items-center gap-4">
					{user ? (
						<div className="hidden items-center gap-4 lg:flex">
							<span className="text-sm text-muted-foreground">
								{user.email}
							</span>
						</div>
					) : (
						<div className="hidden items-center gap-3 lg:flex">
							<Button asChild variant="ghost">
								<Link to="/sign-in">Sign in</Link>
							</Button>
							<Button asChild>
								<Link to="/sign-up">Create account</Link>
							</Button>
						</div>
					)}
					<MobileNavSheet />
				</div>
			</div>
		</header>
	);
}
