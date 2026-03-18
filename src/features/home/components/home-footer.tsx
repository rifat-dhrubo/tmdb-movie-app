export function HomeFooter() {
	return (
		<footer className="border-t border-border/40 bg-secondary/30 py-16">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center justify-between gap-6 md:flex-row">
					<div className="flex items-center gap-2">
						<img
							alt="Cine"
							className="size-7 rounded-full object-cover"
							height="28"
							src="/logo192.png"
							width="28"
						/>
					</div>

					<div className="flex items-center gap-6 text-sm text-muted-foreground">
						<a
							className="transition-colors hover:text-foreground"
							href="/search"
						>
							Search
						</a>
						<a
							className="transition-colors hover:text-foreground"
							href="/watchlist"
						>
							Watchlist
						</a>
					</div>

					<p className="text-xs text-muted-foreground">
						© {new Date().getFullYear()} Cine
					</p>
				</div>
			</div>
		</footer>
	);
}
