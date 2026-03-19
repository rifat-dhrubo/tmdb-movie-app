import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/discover')({
	component: DiscoverPage,
});

function DiscoverPage() {
	return (
		<main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
			<h1 className="font-serif text-3xl tracking-tight md:text-4xl">
				Discover
			</h1>
			<p className="mt-2 text-muted-foreground">Coming soon...</p>
		</main>
	);
}
