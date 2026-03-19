import { Link } from '@tanstack/react-router';

import { Icon } from '@/components/icon';
import { useMovieRecommendations } from '@/generated/tmdb/default/default';
import type { SearchMovie200ResultsItem } from '@/generated/tmdb/tmdbApi.schemas';
import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';

interface MovieDetailRecommendationsProps {
	movieId: number;
}

export function MovieDetailRecommendations({
	movieId,
}: MovieDetailRecommendationsProps) {
	const { data, isLoading } = useMovieRecommendations(movieId, {});

	const recommendations =
		(data?.results as Array<SearchMovie200ResultsItem> | undefined) ?? [];
	const topRecommendations = recommendations.slice(0, 6);

	if (isLoading) {
		return (
			<div>
				<h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
					You might also like
				</h2>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
					{Array.from({ length: 6 }).map((_, i) => (
						<div
							key={i}
							className="aspect-[2/3] animate-pulse rounded-sm bg-muted"
						/>
					))}
				</div>
			</div>
		);
	}

	if (topRecommendations.length === 0) return null;

	return (
		<div>
			<div className="flex items-center justify-between">
				<h2 className="mb-3 font-serif text-2xl tracking-tight text-foreground md:text-3xl">
					You might also like
				</h2>

				<Link
					className="text-sm text-muted-foreground transition-colors hover:text-foreground"
					to="/discover"
				>
					Browse more →
				</Link>
			</div>

			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				{topRecommendations.map((movie) => (
					<RecommendationCard key={movie.id} movie={movie} />
				))}
			</div>
		</div>
	);
}

interface RecommendationCardProps {
	movie: SearchMovie200ResultsItem;
}

function RecommendationCard({ movie }: RecommendationCardProps) {
	const posterUrl = buildTmdbImageUrl({
		path: movie.poster_path ?? null,
		size: 'w342',
		type: 'poster',
	});
	const year = movie.release_date
		? new Date(movie.release_date).getFullYear()
		: null;
	const movieId = movie.id;

	if (!movieId) return null;

	return (
		<Link className="group block" params={{ movieId }} to="/movie/$movieId">
			<div className="relative aspect-[2/3] overflow-hidden rounded-sm bg-muted">
				{posterUrl ? (
					<img
						alt={movie.title}
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						loading="lazy"
						src={posterUrl}
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-muted p-4">
						<span className="text-center font-serif text-sm text-muted-foreground">
							{movie.title}
						</span>
					</div>
				)}

				{/* Gradient overlay at bottom */}
				<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8">
					<h3 className="font-serif text-sm leading-tight text-white">
						{movie.title}
					</h3>
					<div className="mt-1 flex items-center gap-2 text-xs text-white/70">
						{movie.vote_average ? (
							<span className="flex items-center gap-0.5">
								<Icon className="size-3" name="star_fill" />
								{movie.vote_average.toFixed(1)}
							</span>
						) : null}
						{year ? <span>{year}</span> : null}
					</div>
				</div>
			</div>
		</Link>
	);
}
