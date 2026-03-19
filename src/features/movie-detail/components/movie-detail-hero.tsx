import { MovieDetailHeroInfo } from './movie-detail-hero-info';
import { MovieDetailHeroPoster } from './movie-detail-hero-poster';

import type { MovieDetails200 } from '@/generated/tmdb/tmdbApi.schemas';

interface MovieDetailHeroProps {
	isPending: boolean;
	movie: MovieDetails200;
	saved: boolean;
	onToggleSave: () => void;
}

export function MovieDetailHero({
	isPending,
	movie,
	onToggleSave,
	saved,
}: MovieDetailHeroProps) {
	return (
		<section className="relative min-h-[50vh] overflow-hidden bg-background">
			<div className="relative container mx-auto px-4 py-8 md:py-16">
				<div className="grid items-start gap-8 lg:grid-cols-[380px_1fr] lg:gap-16">
					<MovieDetailHeroPoster
						posterPath={movie.poster_path ?? null}
						title={movie.title ?? ''}
					/>

					<MovieDetailHeroInfo
						homepage={movie.homepage}
						isPending={isPending}
						movie={movie}
						saved={saved}
						onToggleSave={onToggleSave}
					/>
				</div>
			</div>
		</section>
	);
}
