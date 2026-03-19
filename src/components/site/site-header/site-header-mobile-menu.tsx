import { Link } from '@tanstack/react-router';

import { siteHeaderNavItems } from './site-header-nav-items';

import { Icon } from '@/components/icon';

interface SiteHeaderMobileMenuProps {
	onNavigate: () => void;
}

export function SiteHeaderMobileMenu({
	onNavigate,
}: SiteHeaderMobileMenuProps) {
	return (
		<nav aria-label="Mobile" className="flex flex-col gap-2 py-6">
			{siteHeaderNavItems.map((item) => {
				const baseClasses =
					'rounded-[1.25rem] border px-4 py-4 transition-colors duration-[var(--motion-fast)] border-transparent text-foreground hover:border-border/50 hover:bg-secondary/55';
				const activeClasses =
					'border-border/70 bg-secondary/80 text-foreground shadow-sm';

				return (
					<Link
						key={item.to}
						activeOptions={{ exact: item.to === '/' }}
						className={baseClasses}
						to={item.to}
						activeProps={{
							className: activeClasses,
						}}
						onClick={onNavigate}
					>
						{(props: { isActive?: boolean }) => (
							<div className="flex items-center justify-between gap-4">
								<div className="flex items-center gap-3">
									<Icon
										className="size-5 text-muted-foreground"
										name={item.icon}
									/>
									<div className="flex flex-col items-start gap-1 text-left">
										<span className="font-serif text-[1.35rem] tracking-[-0.03em]">
											{item.label}
										</span>
										<span className="text-[0.68rem] tracking-[0.18em] text-muted-foreground uppercase">
											{props.isActive ? 'Current section' : 'Open section'}
										</span>
									</div>
								</div>
								<span className="h-px w-8 bg-primary/60" />
							</div>
						)}
					</Link>
				);
			})}
		</nav>
	);
}
