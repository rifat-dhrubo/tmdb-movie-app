interface WatchlistGenreRowProps {
	count: number;
	name: string;
}

export function WatchlistGenreRow({ count, name }: WatchlistGenreRowProps) {
	return (
		<div>
			<div className="flex items-center justify-between pr-4 text-sm text-foreground">
				<span>{name}</span>
				<span className="text-muted-foreground">{count}</span>
			</div>
			<div className="mt-2 h-px w-full bg-border">
				<div className="h-px bg-primary" />
			</div>
		</div>
	);
}
