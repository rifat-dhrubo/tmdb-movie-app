import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';

export function WatchlistGuestState() {
	return (
		<div className="mt-8 rounded-xl border border-border bg-card p-12 text-center shadow-sm">
			<p className="text-muted-foreground">
				Sign in to sync your watchlist across every device.
			</p>
			<Button asChild className="mt-5" variant="contrast">
				<Link to="/sign-in">Sign in</Link>
			</Button>
		</div>
	);
}
