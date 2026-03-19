interface WatchlistStatCardProps {
	label: string;
	value: string;
}

export function WatchlistStatCard({ label, value }: WatchlistStatCardProps) {
	return (
		<div className="rounded-xl border border-border/70 bg-card-dark px-4 py-4 text-background shadow-sm">
			<p className="text-[11px] tracking-[0.24em] text-muted uppercase dark:text-muted-foreground">
				{label}
			</p>
			<p className="mt-2 font-mono text-3xl font-semibold tracking-tight dark:text-foreground">
				{value}
			</p>
		</div>
	);
}
