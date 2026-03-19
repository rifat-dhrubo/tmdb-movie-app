import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';

export function WatchlistEmptyState() {
	return (
		<div className="mt-8 rounded-xl border border-border bg-card p-12 text-center shadow-sm">
			<p className="text-muted-foreground">
				Your watchlist is empty. Start adding films from the search page.
			</p>
			<Button asChild className="mt-5" variant="contrast">
				<Link to="/search">Discover films</Link>
			</Button>
		</div>
	);
}
