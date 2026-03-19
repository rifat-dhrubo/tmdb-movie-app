import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { env } from '@/env';
import { CastDetailContent } from '@/features/cast-detail/components/cast-detail-content';
import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';

const castDetailSchema = z.object({
	castId: z.coerce.number().positive(),
});

export const Route = createFileRoute('/_app/cast/$castId')({
	component: CastDetailPage,
	params: {
		parse: (params) => castDetailSchema.parse(params),
	},
	loader: async ({ params }) => {
		const { personDetails } = await import('@/generated/tmdb/default/default');
		const person = await personDetails(params.castId);
		return { person };
	},
	head: ({ loaderData }) => {
		const person = loaderData?.person;
		if (!person) {
			return {
				meta: [
					{
						title: 'Person Not Found — Cine',
					},
					{
						name: 'description',
						content: 'The requested person could not be found.',
					},
					{ property: 'og:title', content: 'Person Not Found — Cine' },
					{
						property: 'og:description',
						content: 'The requested person could not be found.',
					},
				],
			};
		}

		const name = person.name ?? 'Unknown';
		const description = person.biography
			? person.biography.slice(0, 200) +
				(person.biography.length > 200 ? '...' : '')
			: `Discover ${name}'s filmography on Cine — your personal cinema journal.`;
		const imageUrl =
			(person.profile_path
				? buildTmdbImageUrl({
						type: 'profile',
						path: person.profile_path,
						size: 'h632',
					})
				: null) ?? `${env.VITE_PUBLIC_SITE_URL}/og-image.svg`;
		const url = `${env.VITE_PUBLIC_SITE_URL}/cast/${person.id}`;

		return {
			meta: [
				{ title: `${name} — Cine` },
				{ name: 'description', content: description },
				{ property: 'og:title', content: `${name} — Cine` },
				{ property: 'og:description', content: description },
				{ property: 'og:type', content: 'profile' },
				{ property: 'og:url', content: url },
				{ property: 'og:image', content: imageUrl },
				{ property: 'og:image:alt', content: `Photo of ${name}` },
				{ name: 'twitter:title', content: `${name} — Cine` },
				{ name: 'twitter:description', content: description },
				{ name: 'twitter:image', content: imageUrl },
			],
		};
	},
});

function CastDetailPage() {
	const { castId } = Route.useParams();

	return (
		<main className="pb-16">
			<CastDetailContent castId={castId} />
		</main>
	);
}
