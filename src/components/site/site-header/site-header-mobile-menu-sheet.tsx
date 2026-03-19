import { SignOut, User } from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';

import { SiteHeaderMobileMenu } from './site-header-mobile-menu';
import { SoundToggle } from './sound-toggle';
import { ThemeToggle } from './theme-toggle';

import { SiteLogo } from '@/components/site/site-logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

interface SiteHeaderMobileMenuSheetProps {
	children: React.ReactNode;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onNavigate: () => void;
	user: {
		photoURL?: string | null;
		email: string;
	} | null;
	displayName: string;
	initials: string;
	onSignOut: () => void;
}

export function SiteHeaderMobileMenuSheet({
	children,
	displayName,
	initials,
	onNavigate,
	onOpenChange,
	onSignOut,
	open,
	user,
}: SiteHeaderMobileMenuSheetProps) {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="flex w-full flex-col border-l border-border/60 bg-background/96 px-0 backdrop-blur-xl sm:max-w-sm">
				<SheetHeader className="border-b border-border/40 px-6 pt-6 pb-5 text-left">
					<div className="flex items-center justify-between">
						<SheetTitle className="flex items-center gap-3">
							<SiteLogo />
						</SheetTitle>
						<div className="flex items-center gap-1">
							<SoundToggle />
							<ThemeToggle />
						</div>
					</div>
				</SheetHeader>

				<div className="flex flex-1 flex-col px-6 pb-6">
					<SiteHeaderMobileMenu onNavigate={onNavigate} />

					<div className="mt-auto border-t border-border/40 pt-5">
						{user ? (
							<Card>
								<CardContent className="flex items-center gap-3">
									<Avatar className="size-11 ring-2 ring-background">
										<AvatarImage
											alt={displayName}
											src={user.photoURL ?? undefined}
										/>
										<AvatarFallback className="bg-muted text-sm font-medium text-muted-foreground">
											{initials}
										</AvatarFallback>
									</Avatar>
									<div className="min-w-0 flex-1">
										<p className="truncate font-serif text-[1.05rem] tracking-[-0.02em] text-foreground">
											{displayName}
										</p>
										<p className="truncate text-xs text-muted-foreground">
											{user.email}
										</p>
									</div>
								</CardContent>
								<CardFooter>
									<Button
										className="w-full"
										type="button"
										variant="outline"
										onClick={onSignOut}
									>
										<SignOut className="mr-2 size-4" weight="regular" />
										Sign out
									</Button>
								</CardFooter>
							</Card>
						) : (
							<div className="flex flex-col gap-2">
								<Button asChild>
									<Link to="/sign-in" onClick={onNavigate}>
										<User className="mr-2 size-4" weight="regular" />
										Sign in
									</Link>
								</Button>
							</div>
						)}
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
