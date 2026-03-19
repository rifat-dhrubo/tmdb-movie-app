import { createFileRoute } from '@tanstack/react-router';

import { SiteHeader } from '@/components/site';

export const Route = createFileRoute('/discover')({
	component: DiscoverPage,
});

function DiscoverPage() {
	return (
		<div className="min-h-screen bg-background">
			<SiteHeader />
			<main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
				<h1 className="font-serif text-3xl tracking-tight md:text-4xl">
					Discover
				</h1>
				<p className="mt-2 text-muted-foreground">Coming soon...</p>
			</main>
		</div>
	);
}
