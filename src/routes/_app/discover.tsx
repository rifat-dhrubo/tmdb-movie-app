import { createFileRoute } from '@tanstack/react-router';

import { env } from '@/env';
import { DiscoverPage as DiscoverFeaturePage } from '@/features/discover';
import { discoverSearchSchema } from '@/features/discover/constants';

export const Route = createFileRoute('/_app/discover')({
	component: DiscoverPage,
	validateSearch: discoverSearchSchema,
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
		<main className="pb-16">
			<DiscoverFeaturePage />
		</main>
	);
}
