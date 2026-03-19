import { Link } from '@tanstack/react-router';

import { Icon } from '@/components/icon';
import { Image } from '@/components/ui/image';
import type { WatchlistItem } from '@/features/watchlist';
import {
	formatWatchlistStub,
	getWatchlistPosterGradient,
} from '@/features/watchlist';
import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';
import { cn } from '@/lib/utils';

interface WatchlistGridCardProps {
	index: number;
	item: WatchlistItem;
}

export function WatchlistGridCard({ index, item }: WatchlistGridCardProps) {
	const imageUrl = buildTmdbImageUrl({
		path: item.posterPath ?? null,
		size: 'w342',
		type: 'poster',
	});

	return (
		<Link
			className="group block overflow-hidden rounded-xl border border-border bg-card-dark text-background shadow-lg transition-all hover:shadow-xl dark:bg-card"
			params={{ movieId: item.tmdbId }}
			to="/movies/$movieId"
		>
			<div className="relative aspect-3/4 overflow-hidden bg-muted">
				{imageUrl ? (
					<Image
						alt={item.title}
						className="transition-transform duration-500 group-hover:scale-105"
						containerClassName="h-full w-full"
						src={imageUrl}
					/>
				) : (
					<div
						className={cn(
							'h-full w-full bg-linear-to-br',
							getWatchlistPosterGradient(item.tmdbId),
						)}
					/>
				)}
				<div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />
				<span className="absolute top-3 left-3 font-mono text-xs tracking-[0.28em] text-background uppercase dark:text-foreground">
					{formatWatchlistStub(index)}
				</span>
				<div className="absolute right-3 bottom-3 flex items-center gap-1.5 font-mono text-sm font-semibold text-background dark:text-foreground">
					<Icon className="size-3" name="star_fill" />
					{(item.voteAverage ?? 0).toFixed(1)}
				</div>
			</div>
			<div className="border-border px-4 py-4">
				<h3 className="font-serif text-2xl leading-tight text-background dark:text-foreground">
					{item.title}
				</h3>
				<p className="mt-3 text-xs tracking-[0.16em] uppercase dark:text-muted-foreground">
					Dir {item.displayDirector ?? 'Unknown'}
				</p>
				<p className="mt-1 text-xs tracking-[0.16em] uppercase dark:text-muted-foreground">
					Year {item.releaseYear ?? '----'}
				</p>
			</div>
		</Link>
	);
}
