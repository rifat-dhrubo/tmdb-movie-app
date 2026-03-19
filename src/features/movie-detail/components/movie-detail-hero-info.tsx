import { Icon } from '@/components/icon';
import { Spacer } from '@/components/spacer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WatchlistToggleButton } from '@/features/watchlist';
import type { MovieDetails200 } from '@/generated/tmdb/tmdbApi.schemas';
import { formatRuntime } from '@/lib/utils';

interface MovieDetailHeroInfoProps {
	isPending: boolean;
	movie: MovieDetails200;
	homepage?: string;
	saved: boolean;
	onToggleSave: () => void;
}

export function MovieDetailHeroInfo({
	homepage,
	isPending,
	movie,
	onToggleSave,
	saved,
}: MovieDetailHeroInfoProps) {
	const genres = movie.genres?.map((g) => g.name).filter(Boolean) ?? [];

	const stats = [
		{
			label: 'Rating',
			value: movie.vote_average ? movie.vote_average.toFixed(1) : '-',
			icon: <Icon className="size-3" name="star_fill" />,
		},
		{
			label: 'Runtime',
			value: movie.runtime ? formatRuntime(movie.runtime) : '-',
		},
		{
			label: 'Release Date',
			value: movie.release_date ?? '-',
		},
		{
			label: 'Popularity',
			value: movie.popularity ? Math.round(movie.popularity).toString() : '-',
		},
	];

	return (
		<div>
			<Badge className="text-xs" variant="secondary">
				<span className="mr-1.5 inline-block size-1.5 rounded-full bg-primary" />
				Now viewing
			</Badge>

			<Spacer size={12} />
			<h1 className="font-serif text-3xl leading-tight font-normal tracking-tight text-foreground md:text-4xl lg:text-5xl">
				{movie.title}
			</h1>
			<Spacer size={12} />

			{movie.tagline ? (
				<p className="font-serif text-lg text-muted-foreground italic md:text-xl">
					&quot;{movie.tagline}&quot;
				</p>
			) : null}

			<Spacer size={12} />

			<div className="flex flex-wrap items-center gap-2">
				{genres.map((genre) => (
					<span
						key={genre}
						className="rounded-full border border-border/60 bg-background px-3 py-1 text-xs text-muted-foreground"
					>
						{genre}
					</span>
				))}
			</div>

			<Spacer size={12} />

			{movie.overview ? (
				<div className="max-w-2xl">
					<p className="text-base leading-relaxed text-foreground/80 md:text-lg">
						{movie.overview}
					</p>
				</div>
			) : null}
			<Spacer size={24} />

			<div className="flex flex-wrap gap-3">
				<WatchlistToggleButton
					mode="hero"
					movieTitle={movie.title ?? undefined}
					pending={isPending}
					saved={saved}
					onClick={onToggleSave}
				/>

				{homepage ? (
					<Button asChild size="lg" variant="outline">
						<a href={homepage} rel="noopener noreferrer" target="_blank">
							<Icon className="mr-2 size-4" name="arrow_square_out" />
							Official Website
						</a>
					</Button>
				) : null}
			</div>

			<Spacer size={24} />

			<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
				{stats.map((stat) => (
					<div
						key={stat.label}
						className="flex flex-col items-center justify-center rounded-sm bg-foreground px-2 py-3 text-center"
					>
						<span className="flex items-center gap-1 text-xs text-background/70">
							{stat.icon}
							{stat.label}
						</span>
						<span className="mt-1 text-lg font-medium text-background md:text-xl">
							{stat.value}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
