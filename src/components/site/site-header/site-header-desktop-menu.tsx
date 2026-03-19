import { Link } from '@tanstack/react-router';

import { getSiteHeaderNavItems } from './site-header-nav-items';

interface SiteHeaderDesktopMenuProps {
	showWatchlist: boolean;
}

export function SiteHeaderDesktopMenu({
	showWatchlist,
}: SiteHeaderDesktopMenuProps) {
	const navItems = getSiteHeaderNavItems(showWatchlist);

	return (
		<nav
			aria-label="Primary"
			className="hidden items-center justify-center md:flex"
		>
			<div className="flex items-center gap-1 rounded-full border border-border/70 bg-secondary/55 p-1 shadow-[0_1px_0_hsl(var(--background))_inset]">
				{navItems.map((item) => {
					const baseClasses =
						'group/menu relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-[background-color,color,box-shadow] duration-[var(--motion-fast)] hover:bg-background/80 hover:text-foreground';
					const activeClasses =
						'bg-background text-foreground shadow-sm ring-1 ring-border/70';

					return (
						<Link
							key={item.to}
							activeOptions={{ exact: item.to === '/' }}
							className={baseClasses}
							to={item.to}
							activeProps={{
								className: activeClasses,
							}}
						>
							{item.label}
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
