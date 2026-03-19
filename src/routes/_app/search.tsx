import { createFileRoute } from '@tanstack/react-router';

import { env } from '@/env';
import { SearchPage as SearchFeaturePage } from '@/features/search';
import { searchSchema } from '@/features/search/constants';

export const Route = createFileRoute('/_app/search')({
	component: SearchRoutePage,
	validateSearch: searchSchema,
	head: () => ({
		meta: [
			{ title: 'Search Movies — Cine' },
			{
				name: 'description',
				content:
					'Search for movies, filter by year, and discover your next favorite film on Cine.',
			},
			{
				property: 'og:title',
				content: 'Search Movies — Cine',
			},
			{
				property: 'og:description',
				content:
					'Search for movies, filter by year, and discover your next favorite film on Cine.',
			},
			{ property: 'og:type', content: 'website' },
			{ property: 'og:url', content: `${env.VITE_PUBLIC_SITE_URL}/search` },
			{
				name: 'twitter:title',
				content: 'Search Movies — Cine',
			},
			{
				name: 'twitter:description',
				content:
					'Search for movies, filter by year, and discover your next favorite film on Cine.',
			},
		],
	}),
});

function SearchRoutePage() {
	return (
		<main className="pb-16">
			<SearchFeaturePage />
		</main>
	);
}
