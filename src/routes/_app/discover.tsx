import { createFileRoute } from '@tanstack/react-router';

import { env } from '@/env';

export const Route = createFileRoute('/_app/discover')({
	component: DiscoverPage,
	head: () => ({
		meta: [
			{ title: 'Discover Movies — Cine' },
			{
				name: 'description',
				content:
					'Explore trending and popular movies. Discover your next favorite film on Cine.',
			},
			{
				property: 'og:title',
				content: 'Discover Movies — Cine',
			},
			{
				property: 'og:description',
				content:
					'Explore trending and popular movies. Discover your next favorite film on Cine.',
			},
			{ property: 'og:type', content: 'website' },
			{ property: 'og:url', content: `${env.VITE_PUBLIC_SITE_URL}/discover` },
			{
				name: 'twitter:title',
				content: 'Discover Movies — Cine',
			},
			{
				name: 'twitter:description',
				content:
					'Explore trending and popular movies. Discover your next favorite film on Cine.',
			},
		],
	}),
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
