import { createFileRoute, useParams } from '@tanstack/react-router';
import { z } from 'zod';

import { SiteHeader } from '@/components/site';
import { MovieDetailContent } from '@/features/movie-detail/components/movie-detail-content';

const movieDetailSchema = z.object({
	movieId: z.coerce.number().positive(),
});

export const Route = createFileRoute('/movies/$movieId')({
	component: MovieDetailPage,
	params: {
		parse: (params) => movieDetailSchema.parse(params),
	},
});

function MovieDetailPage() {
	const { movieId } = useParams({ from: '/movies/$movieId', strict: true });

	return (
		<div className="min-h-screen bg-background">
			<SiteHeader />
			<main className="pb-16">
				<MovieDetailContent movieId={movieId} />
			</main>
		</div>
	);
}
