import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { env } from '@/env';
import { MovieDetailContent } from '@/features/movie-detail/components/movie-detail-content';
import { movieDetails } from '@/generated/tmdb/default/default';
import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';

const movieDetailSchema = z.object({
	movieId: z.coerce.number().positive(),
});

export const Route = createFileRoute('/_app/movie/$movieId')({
	component: MovieDetailPage,
	params: {
		parse: (params) => movieDetailSchema.parse(params),
	},
	loader: async ({ params }) => {
		const movie = await movieDetails(params.movieId);
		return { movie };
	},
	head: ({ loaderData }) => {
		const movie = loaderData?.movie;
		if (!movie) {
			return {
				meta: [
					{
						title: 'Movie Not Found — Cine',
						content: 'Movie Not Found — Cine',
					},
					{
						name: 'description',
						content: 'The requested movie could not be found.',
					},
					{ property: 'og:title', content: 'Movie Not Found — Cine' },
					{
						property: 'og:description',
						content: 'The requested movie could not be found.',
					},
				],
			};
		}

		const title = movie.title ?? 'Unknown Movie';
		const year = movie.release_date
			? new Date(movie.release_date).getFullYear()
			: null;
		const fullTitle = year ? `${title} (${year})` : title;
		const description = movie.overview
			? movie.overview.slice(0, 200) +
				(movie.overview.length > 200 ? '...' : '')
			: `Discover ${title} on Cine — your personal cinema journal.`;
		const imageUrl =
			buildTmdbImageUrl({
				type: 'poster',
				path: movie.poster_path,
				size: 'w780',
			}) ?? `${env.VITE_PUBLIC_SITE_URL}/og-image.svg`;
		const url = `${env.VITE_PUBLIC_SITE_URL}/movie/${movie.id}`;

		return {
			meta: [
				{ title: `${fullTitle} — Cine` },
				{ name: 'description', content: description },
				{ property: 'og:title', content: `${fullTitle} — Cine` },
				{ property: 'og:description', content: description },
				{ property: 'og:type', content: 'video.movie' },
				{ property: 'og:url', content: url },
				{ property: 'og:image', content: imageUrl },
				{ property: 'og:image:alt', content: `Poster for ${title}` },
				{ name: 'twitter:title', content: `${fullTitle} — Cine` },
				{ name: 'twitter:description', content: description },
				{ name: 'twitter:image', content: imageUrl },
			],
		};
	},
});

function MovieDetailPage() {
	const { movieId } = Route.useParams();

	return (
		<main className="pb-16">
			<MovieDetailContent movieId={movieId} />
		</main>
	);
}
