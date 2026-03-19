import { List, SignOut } from '@phosphor-icons/react';
import { ClientOnly, Link, useNavigate } from '@tanstack/react-router';
import React from 'react';

import { SiteHeaderDesktopMenu } from './site-header-desktop-menu';
import { SiteHeaderMobileMenuSheet } from './site-header-mobile-menu-sheet';

import { SiteLogo } from '@/components/site/site-logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/features/auth';

export function SiteHeader() {
	const { logout, user } = useAuth();
	const navigate = useNavigate();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleSignOut = () => {
		void logout().then(() => {
			void navigate({ to: '/' });
			setMobileOpen(false);
		});
	};

	const initials = user?.email
		? user.email.split('@')[0].slice(0, 2).toUpperCase()
		: '?';

	const displayName = user?.displayName ?? user?.email ?? 'Guest';

	return (
		<header className="sticky top-0 z-40 border-b border-border/50 bg-background backdrop-blur-xl">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid h-18 grid-cols-[auto_1fr_auto] items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
					<div className="flex min-w-0 items-center justify-start">
						<SiteLogo />
					</div>

					<SiteHeaderDesktopMenu />

					<ClientOnly>
						<div className="hidden items-center justify-end md:flex">
							{user ? (
								<DropdownMenu>
									<DropdownMenuTrigger className="flex items-center gap-2">
										<Avatar className="size-8 ring-2 ring-background">
											<AvatarImage
												alt={displayName}
												src={user.photoURL ?? undefined}
											/>
											<AvatarFallback className="bg-muted text-[10px] font-medium text-muted-foreground">
												{initials}
											</AvatarFallback>
										</Avatar>
										<div className="flex min-w-0 flex-col items-start text-left">
											<span className="max-w-[9rem] truncate text-sm font-medium text-foreground">
												{displayName}
											</span>
											<span className="max-w-[9rem] truncate text-[0.7rem] tracking-[0.14em] text-muted-foreground uppercase">
												Account
											</span>
										</div>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align="end"
										className="w-56"
										sideOffset={10}
									>
										<div className="space-y-1 px-2 py-2.5">
											<p className="font-serif text-base tracking-[-0.02em] text-foreground">
												{displayName}
											</p>
											<p className="text-xs text-muted-foreground">
												{user.email}
											</p>
										</div>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											className="text-destructive focus:text-destructive"
											onClick={() => void handleSignOut()}
										>
											<SignOut className="mr-2 size-4" weight="regular" />
											Sign out
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							) : (
								<div className="flex items-center gap-2">
									<Button asChild>
										<Link to="/sign-in">Sign in</Link>
									</Button>
								</div>
							)}
						</div>
					</ClientOnly>

					<div className="flex justify-self-end md:hidden">
						<SiteHeaderMobileMenuSheet
							displayName={displayName}
							initials={initials}
							open={mobileOpen}
							user={
								user
									? {
											photoURL: user.photoURL,
											email: user.email ?? '',
										}
									: null
							}
							onNavigate={() => setMobileOpen(false)}
							onOpenChange={setMobileOpen}
							onSignOut={handleSignOut}
						>
							<Button size="icon" variant="outline">
								<List className="size-5" />
							</Button>
						</SiteHeaderMobileMenuSheet>
					</div>
				</div>
			</div>
		</header>
	);
}
