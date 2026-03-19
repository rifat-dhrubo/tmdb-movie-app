import { createFileRoute, useParams } from '@tanstack/react-router';
import { z } from 'zod';

import { MovieDetailContent } from '@/features/movie-detail/components/movie-detail-content';

const movieDetailSchema = z.object({
	movieId: z.coerce.number().positive(),
});

export const Route = createFileRoute('/_app/movies/$movieId')({
	component: MovieDetailPage,
	params: {
		parse: (params) => movieDetailSchema.parse(params),
	},
});

function MovieDetailPage() {
	const { movieId } = useParams({
		from: '/_app/movies/$movieId',
		strict: true,
	});

	return (
		<main className="pb-16">
			<MovieDetailContent movieId={movieId} />
		</main>
	);
}
