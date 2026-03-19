import { Link } from '@tanstack/react-router';

import { MovieDetailHeroInfo } from './movie-detail-hero-info';
import { MovieDetailHeroPoster } from './movie-detail-hero-poster';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
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
				<div className="mb-6 lg:w-[380px] lg:pl-1">
					<Button
						asChild
						className="rounded-full border-border/60 bg-background/72 pr-3 pl-2.5 text-[0.78rem] text-muted-foreground shadow-none backdrop-blur-sm hover:bg-background hover:text-foreground"
						size="sm"
						variant="outline"
					>
						<Link to="/search">
							<Icon className="size-3.5 rotate-180" name="arrow_right_bold" />
							Back to search
						</Link>
					</Button>
				</div>

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
