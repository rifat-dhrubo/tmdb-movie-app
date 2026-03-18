import { createFileRoute } from '@tanstack/react-router';

import { SiteHeader } from '@/components/site';
import { useAuth } from '@/features/auth';

export const Route = createFileRoute('/watchlist')({
	component: WatchlistPage,
});

function WatchlistPage() {
	const { user } = useAuth();

	return (
		<div className="min-h-screen bg-background">
			<SiteHeader />
			<main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
				<h1 className="font-serif text-3xl tracking-tight md:text-4xl">
					Your Watchlist
				</h1>
				<p className="mt-2 text-muted-foreground">
					Track and curate the films that matter to you.
				</p>
				{!user ? (
					<div className="mt-8 rounded-lg border border-border/40 bg-card p-12 text-center">
						<p className="text-muted-foreground">
							Sign in to view and manage your watchlist.
						</p>
						<a
							className="mt-4 inline-block text-primary hover:underline"
							href="/sign-in"
						>
							Sign in
						</a>
					</div>
				) : (
					<div className="mt-8 rounded-lg border border-border/40 bg-card p-12 text-center">
						<p className="text-muted-foreground">
							Your watchlist is empty. Start adding films from the search page.
						</p>
						<a
							className="mt-4 inline-block text-primary hover:underline"
							href="/search"
						>
							Discover films
						</a>
					</div>
				)}
			</main>
		</div>
	);
}
