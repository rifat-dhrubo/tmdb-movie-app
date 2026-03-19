import { Spacer } from '@/components/spacer';
import type { PersonMovieCredits200CastItem } from '@/generated/tmdb/tmdbApi.schemas';
import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';

interface CastDetailFilmographyProps {
	cast: Array<PersonMovieCredits200CastItem>;
}

export function CastDetailFilmography({ cast }: CastDetailFilmographyProps) {
	if (cast.length === 0) return null;

	return (
		<div>
			<div className="flex items-center justify-between">
				<h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
					Acting
				</h2>
			</div>

			<Spacer size={12} />

			<div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
				{cast.map((movie) => (
					<FilmographyCard key={movie.credit_id} movie={movie} type="cast" />
				))}
			</div>
		</div>
	);
}

interface FilmographyCardProps {
	job?: string;
	movie: PersonMovieCredits200CastItem;
	type: 'cast' | 'crew';
}

function FilmographyCard({ job, movie }: FilmographyCardProps) {
	const imageUrl = buildTmdbImageUrl({
		path: movie.poster_path ?? null,
		size: 'w342',
		type: 'poster',
	});

	const year = movie.release_date
		? new Date(movie.release_date).getFullYear()
		: null;

	return (
		<div className="group shrink-0">
			<div className="relative w-32 overflow-hidden rounded-sm bg-muted md:w-36">
				<div className="aspect-[2/3] overflow-hidden">
					{imageUrl ? (
						<img
							alt={movie.title}
							className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
							src={imageUrl}
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center bg-foreground">
							<span className="px-2 text-center font-serif text-sm text-background">
								{movie.title}
							</span>
						</div>
					)}
				</div>

				{job ? (
					<div className="absolute top-2 right-2">
						<span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
							{job}
						</span>
					</div>
				) : null}
			</div>

			<div className="mt-2 w-32 md:w-36">
				<p className="line-clamp-1 text-sm font-medium text-foreground">
					{movie.title}
				</p>
				{movie.character ? (
					<p className="line-clamp-1 text-xs text-muted-foreground">
						as {movie.character}
					</p>
				) : null}
				{year ? <p className="text-xs text-muted-foreground">{year}</p> : null}
			</div>
		</div>
	);
}
